import {template} from "./StoryEditorWidgetTemplate.js";
import { I18nUtils } from "../../shared/js/I18nUtils.js";
import { component as missionEditorComponent } from "./MissionEditorWidget.js";
import { component as storyGroupsComponent } from "./StoryEditorGroupsWidget.js";
import Story from "../../shared/js/Story.js";
import {Asset} from "../../shared/js/Asset.js";
// import VueQrcode from '/libs/vue-qrcode/vue-qrcode.esm.js';

// Vue.component(VueQrcode.name, VueQrcode);

export const component = {
	template: template,
	props: {
		locale: String,
		localesList: Array,
		value: Object, // story Cache
		stories: Array,
		names: Array,
		mission: Object,
		copiedMission: Object
	},
	components: {
		'mission-editor-widget': missionEditorComponent,
		'story-groups-widget': storyGroupsComponent
	},
	watch: {
		selectedName: function ( newVal ) {
			// when the selected story changes, load the story from the local change if present,
			// else load the story from server
			if (this.selectedName) {
				this.selectMission(null);

				if ( this.stories.some( story => story.name === this.selectedName ) ) {
					console.log("[StoryEditor]", `Loaded the Story ${this.selectedName} from local cache`);
					this.loading = false;
					this.$emit('change-story', this.selectedName);
				}
				else {
					this.getStoryFromServer( this.selectedName );
				}
			}
		}
	},
	computed: {
		selectedName: function () { return (this.tabValue > -1) ? this.names[this.tabValue] : null },
		playStoryURL: function () { return this.value && this.value.name ? encodeURI(`${window.location.protocol}//${window.location.host}/player?story=${this.value.name}`) : "Error"; }
	},
	data() {
		return {
			loading: false,
			tabValue: -1,
			newStory: new Story( null ),
			gamemodes: {
				0 : "StoryEditorWidget.gamemodes.solo",
				1 : "StoryEditorWidget.gamemodes.group",
				2 : "StoryEditorWidget.gamemodes.class"
			},
			ages: {
				0 : "StoryEditorWidget.ages.7_to_10",
				1 : "StoryEditorWidget.ages.11_to_14",
				2 : "StoryEditorWidget.ages.15_to_18"
			}
		}
	},
	methods: {
		updateStoryOnServer() {
			// load to the server the instance of the story present in the local cache
			this.putStoryOnServer( this.value );
		},
		reloadStoryFromServer() {
			// delete story instance from local cache and reload the instance on the server
			let name = this.value.name;
			if ( this.stories.some( story => story.name === name ) ) {
				this.$emit('delete-local-story', name);
			}
			this.getStoryFromServer(this.value.name);
		},
		deleteStory() {
			// delete story from server and from local cache
			let name = this.value.name;
			if ( this.stories.some( story => story.name === name ) ) {
				$.ajax( `/stories/${name}`, {
					method: "DELETE"
				})
					.then ( (data) => {
						this.$emit('delete-local-story', name);
						console.log("[StoryEditor]", `Deleted the Story ${name}`);
					})
					.catch( ( error) => {
						console.log("[StoryEditor]", `Failed to delete the Story ${name}`, error );
					})
					.always( () => {
						this.$emit("update-names");
					});
			}
		},
		putStoryOnServer( storyData ) {
			return new Promise( (resolve, reject) => {

				let storyUrl = `/stories/${storyData.name}`
				let promiseStory = $.ajax( storyUrl, {
					method: "put",
					contentType: 'application/json',
					data: JSON.stringify( storyData )
				});
				let locales = I18nUtils.getRootMessages(this.$i18n, "assets" );

				promiseStory
					.then( response => {
						return Object.keys( locales )
							.map( (lang) => {
								return $.ajax( storyUrl + `/locales/${lang}`, {
									method: "put",
									contentType: 'application/json',
									data: JSON.stringify( locales[ lang ] )
								})
							});
					})
					.then( ( promisesLocales ) => {
						return Promise.all( promisesLocales );
					})
					.then( ( response ) => {
						this.$emit('add-local-story', storyData);
						console.log("[StoryEditor]", `Added (or updated) the Story ${storyData.name} to server`);
						resolve( response )
					})
					.catch( (error) => {
						console.log("[StoryEditor]", `Failed to add or update the Story ${storyData.name}`, error );
						reject( error );
					});
			});
		},
		getStoryFromServer( name ) {
			this.loading = true;
			let reqJSONStory = $.get( `/stories/${name}?source=editor` );
			let reqJSONLocales = I18nUtils.fetchLocales( `/stories/${name}`, "*" );

			Promise.all( [reqJSONStory, reqJSONLocales] )
			// file has been downloaded so can be loaded
			.then( (jsonData) => {

				let story = jsonData[0];
				let locales = jsonData[1];

				let getlocale;
				Object.keys( locales ).forEach( locale => {
					getlocale = this.$i18n.getLocaleMessage( locale );
					getlocale.assets = {};
					this.$i18n.setLocaleMessage( locale, getlocale );
					this.$i18n.mergeLocaleMessage( locale, locales[locale] );
				});

				story.dependencies.locales = locales;
				this.$emit('import', story );
				this.$emit('add-local-story', story);
				console.log("[StoryEditor]", `Loaded the Story ${name} from server`);
				this.loading = false;
			})
			// file can't be downloaded for some reason so report it
			.catch( ( error) => {
				this.tabValue = -1;
				console.error( "[StoryEditor]", `Error loading the Story "${name}" from server`, "cause:", error );
			})
		},
		resetModal(){
			this.newStory = new Story(null)
		},
		saveModal(){
			// Save the new story on server and local cache if a story
			// with the same name doesn't already exists
			let dataExport = this.newStory;

			if (this.names.includes(dataExport.name)) {
				console.log(dataExport.name," already exists");
				return
			}

			this.putStoryOnServer( dataExport )
			.finally( () => {
				this.resetModal();
				this.$emit("update-names");
			});
		},
		showDupModal() {
			this.$bvModal.show('duplicateModal');
		},
		saveDupModal(){
			if (this.names.includes(this.newStory.name)) {
				console.log(dataExport.name," already exists");
				return
			}

			let dataExport = this.value;

			let i18nTupleList = [];

			// disable temporarily asset adding callback
			let callbackBackup = Asset.getDuplicateCallback( Asset.name );
			Asset.setDuplicateCallback( Asset.name, undefined );

			dataExport = dataExport.duplicate( i18nTupleList );
			let localesCopy = I18nUtils.copyOldLabelsToNewLabels( this.$i18n.messages, i18nTupleList );
			dataExport.name = this.newStory.name;

			// re-enable asset adding callback
			Asset.setDuplicateCallback( Asset.name, callbackBackup );

			this.putStoryOnServer( dataExport )
				.then( () => {
					dataExport.dependencies.locales = localesCopy;
					this.$emit( 'add-local-story', dataExport );
				})
			.finally( () => {
				this.resetModal();
				this.$emit("update-names");
			});
		},
		selectMission( index ) {
			this.$emit('select-mission', index);
		},
		copyMission( mission ) {
			this.$emit('copy-mission', mission);
		}
	},
}
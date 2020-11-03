import {template} from "./StoryEditorWidgetTemplate.js";
import { I18nUtils } from "../../shared/js/I18nUtils.js";
import { component as missionEditorComponent } from "./MissionEditorWidget.js";
import { component as storyGroupsComponent } from "./StoryEditorGroupsWidget.js";

function getNewStory() {
	return {
		dependencies: {
			locales: {},
			captions: [],
			videos: [],
			audios: [],
			images: []
		},
		name: "",
		description: "",
		age: "",
		gamemode: "",
		groups: [],
		missions: [],
		activities: []
	}
}

export const component = {
	template: template,
	props: {
		locale: String,
		localesList: Array,
		value: Object, // story Cache
		stories: Array,
		names: Array,
		mission: Object,
		savestory: Boolean,
		copiedMission: Object
	},
	components: {
		'mission-editor-widget': missionEditorComponent,
		'story-groups-widget': storyGroupsComponent
	},
	watch: {
		tabValue: function(newVal) {
		},
		/* BUTTONS
		value: {
			deep: true,
			handler( newStoryValue ) {
				if( newStoryValue ) {
					this.canReload = true;
					if( newStoryValue.name === this.oldName ) {
						this.canUpdate = true;
					}
					if( this.hasReloaded ) {
						this.canUpdate = false;
						this.canReload = false;
					}
					this.oldName = newStoryValue.name;
					this.hasReloaded = false;
				}
			}
		},
		*/
		selectedName: function ( newVal ) {
			if (this.selectedName) {
				//this.canUpdate = false;
				this.selectMission(null);

				if ( this.stories.some( story => story.name === this.selectedName ) ) {
					this.$emit('change-story', this.selectedName);
				}
				else {
					this.getFromServer( this.selectedName );
				}
			}
		},
		savestory: function (newVal) {
			if(newVal) {
				this.onUpdate();
				this.$nextTick(() => {
					this.$emit('saved');
				});

			}
		}
	},
	computed: {
		selectedName: function () { return (this.tabValue > -1) ? this.names[this.tabValue] : null }
	},
	data() {
		return {
			hasReloaded: false,
			canReload: true,
			canUpdate: true,
			//oldName: "",
			loading: false,
			tabValue: -1,
			newStory: getNewStory(),
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
		onAdd() {
			this.$bvModal.show('addModal');
		},
		onUpdate() {
			//this.canUpdate = false;
			//this.canReload = false;
			let dataExport = this.value;
			dataExport.dependencies.locales = I18nUtils.getRootMessages(this.$i18n, "assets" );
			$.ajax( `/stories/${dataExport.name}`, {
				method: "put",
				contentType: 'application/json',
				data: JSON.stringify( dataExport )
			})
			.done( (data) => {
				console.log("[StoryEditor]", `Updated the Story ${dataExport.name}`);
			})
			.fail( ( xhr, textStatus, error) => {
				console.log("[StoryEditor]", `Failed to update the Story ${dataExport.name}`, error );
			})
		},
		onReload() {
			this.hasReloaded = true;

			let name = this.value.name;
			if ( this.stories.some( story => story.name === name ) ) {
				this.$emit('delete-local-story', name);
			}
			this.getFromServer(this.value.name);
		},
		onDelete() {
			self = this;
			let name = this.value.name;
			if ( this.stories.some( story => story.name === name ) ) {
				this.$emit('delete-local-story', name);
			}

			$.ajax( `/stories/${name}`, {
				method: "DELETE"
			})
			.done( (data) => {
				console.log("[StoryEditor]", `Deleted the Story ${name}`);
			})
			.fail( ( xhr, textStatus, error) => {
				console.log("[StoryEditor]", `Failed to delete the Story ${name}`, error );
			})
			.always( () => {
				self.$emit("update-names");
			});
		},
		getFromServer( name ) {
			self = this;
			this.loading = true;
			let reqJSONStory = $.get( `/stories/${name}` );
			let reqJSONLocales = I18nUtils.fetchLocales( `/stories/${name}` );
			Promise.all( [reqJSONStory, reqJSONLocales] )
			// file has been downloaded so can be loaded
			.then( (jsonData) => {
				let story = jsonData[0];
				let locales = jsonData[1];

				let getlocale;
				Object.keys( locales ).forEach( locale => {
					getlocale = self.$i18n.getLocaleMessage( locale );
					getlocale.assets = {};
					self.$i18n.setLocaleMessage( locale, getlocale );
					self.$i18n.mergeLocaleMessage( locale, locales[locale] );
				});

				story.dependencies.locales = locales;
				self.$emit('import', story );
				self.$emit('add-local-story', story);
			})
			// file can't be downloaded for some reason so report it
			.catch( ( error) => {
				console.error( "[StoryEditor]", `Error downloading story "${name}"`, "cause:", error );
			})
			.finally(() => {
				self.loading = false;
			})
		},
		resetModal(){
			this.newStory.name = "";
			this.newStory.description = "";
			this.newStory.gamemode = "";
			this.newStory.age = ""
		},
		saveModal(){
			self = this;
			let dataExport = this.newStory;
			if (this.names.includes(dataExport.name)) {
				console.log(dataExport.name," already exists");
				return
			}
			let assets = {};
			dataExport.dependencies.locales[this.locale] = assets;

			$.ajax( `/stories/${dataExport.name}`, {
				method: "put",
				contentType: 'application/json',
				data: JSON.stringify( dataExport )
			})
			.done( (data) => {
				self.$emit('add-local-story', dataExport);
				console.log("[StoryEditor]", `Created the Story ${dataExport.name}`);
			})
			.fail( ( xhr, textStatus, error) => {
				console.log("[StoryEditor]", `Failed to create or replace the Story ${dataExport.name}`, error );
			})
			.always( () => {
				self.newStory = getNewStory();
				self.$emit("update-names");
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
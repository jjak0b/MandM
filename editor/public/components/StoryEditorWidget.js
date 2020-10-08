import {template} from "./StoryEditorWidgetTemplate.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";

function getNewStory() {
	return {
		assets: {
			locales: {},
			captions: [],
			videos: [],
			images: []
		},
		name: "",
		description: "",
		age: "",
		gamemode: "",
		missionNextId: 0,
		activityNextId: 0,
		missions: [],
		activities: [],
		assetNextId: 0
	}
}

export const component = {
	template: template,
	props: {
		value: Object, // story Cache
		stories: Array,
		names: Array,
		locale: String
	},
	watch: {
		tabValue: function(newVal) {
		},
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
		selectedName: function ( newVal ) {
			if (this.selectedName) {
				this.canUpdate = false;

				if ( this.stories.some( story => story.name === this.selectedName ) ) {
					this.$emit('change-story', this.selectedName);
				}
				else {
					this.getFromServer( this.selectedName );
				}
			}
		}
	},
	computed: {
		selectedName: function () { return (this.tabValue > -1) ? this.names[this.tabValue] : null }
	},
	data() {
		return {
			hasReloaded: false,
			canReload: false,
			canUpdate: false,
			oldName: "",
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
			this.canUpdate = false;
			this.canReload = false;
			let dataExport = this.value;
			let assets = I18nUtils.getRootMessages(this.$i18n, "assets" );
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
			this.getFromServer(this.value.name);
			if ( this.stories.some( story => story.name === name ) ) {
				this.$emit('delete-local-story', name);
			}
			this.$emit('add-local-story', this.value);
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
				story.assets.locales = locales;
				self.$emit('import', story );
				self.$emit('add-local-story', story);
				Object.keys( locales )
				.forEach( locale => self.$i18n.mergeLocaleMessage( locale, locales[ locale ] ) );
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
			dataExport.assets.locales[this.locale] = assets;

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
		}
	},
}
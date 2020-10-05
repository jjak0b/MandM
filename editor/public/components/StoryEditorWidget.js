import {template} from "./StoryEditorWidgetTemplate.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";

export const component = {
	template: template,
	props: {
		value: Object, // story Cache
		names: Array,
		locale: String
	},
	watch: {
		value: {
			immediate: true,
			deep: true,
			handler( newStoryValue ) {
				if( newStoryValue ) {
					this.editStory.name = newStoryValue.name;
					this.editStory.description = newStoryValue.description;
					this.editStory.gamemode = newStoryValue.gamemode;
					this.editStory.age = newStoryValue.age;
				}
			}
		},
		tabValue: function ( newVal ) {
			if (newVal > -1) {
				this.loading = true;
				let name = this.$refs.tabs.tabs[newVal].title;

				self = this;
				let reqJSONStory = $.get( `/stories/${name}` );
				let reqJSONLocales = I18nUtils.fetchLocales( `/stories/${name}` );
				Promise.all( [reqJSONStory, reqJSONLocales] )
				// file has been downloaded so can be loaded
				.then( (jsonData) => {
					let story = jsonData[0];
					let locales = jsonData[1];
					story.assets.locales = locales;
					self.$emit('import', story );
					Object.keys( locales )
					.forEach( locale => self.$i18n.mergeLocaleMessage( locale, locales[ locale ] ) );
				})
				// file can't be downloaded for some reason so report it
				.catch( ( error) => {
					console.error( "[StoryEditor]", `Error downloading story "${name}"`, "cause:", error );
				})
				.finally(() => {
					this.loading = false;
				})
			}
		}
	},
	data() {
		return {
			loading: false,
			tabValue: 0,
			newStory: { // data to export
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
			},
			editStory: {
				name: "",
				description: "",
				gamemode: "",
				age: ""
			},
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
		resetModal(){
			this.newStory.name = "";
			this.newStory.description = "";
			this.newStory.gamemode = "";
			this.newStory.age = ""
		},
		saveModal(){
			if (!this.locale) {
				console.error("Select internationalization");
				return
			}

			let dataExport = this.newStory;
			let assets = {};
			dataExport.assets.locales[this.locale] = assets;

			$.ajax( `/stories/${dataExport.name}`, {
				method: "put",
				contentType: 'application/json',
				data: JSON.stringify( dataExport )
			})
			.done( (data) => {
				console.log("[StoryEditor]", `Created the Story ${dataExport.name}`);
			})
			.fail( ( xhr, textStatus, error) => {
				console.log("[StoryEditor]", `Failed to create or replace the Story ${dataExport.name}`, error );
			})
			.always( () => {
				this.$emit("update-names");
			});

		},
		onSubmit() {
			let dataExport = this.value;
			dataExport.description = this.editStory.description;
			dataExport.age = this.editStory.age;
			dataExport.gamemode = this.editStory.gamemode;
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
	},
}
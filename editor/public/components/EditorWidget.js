import { i18n } from "./Translations.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";
import { component as i18nSelectorComponent, asyncLoad as asyncLoadComponentI18nSelectorWidget } from "./i18nWidgets/I18nSelectorWidget.js";
import { component as i18nInputComponent, asyncLoad as asyncLoadComponentI18nInputWidget } from "./i18nWidgets/I18nInputWidget.js";
import { component as storyEditorComponent } from "./StoryEditorWidget.js";
import { component as activityEditorComponent } from "./ActivityEditorWidgets/ActivityEditorWidget.js";
import {component as formImportFile} from "./StoryEditorWidgets/StoryFormImportFile.js";
import {component as formImportServer} from "./StoryEditorWidgets/StoryFormImportServer.js";
import {component as formExportFile} from "./StoryEditorWidgets/StoryFormExportFile.js";
import {component as formExportServer} from "./StoryEditorWidgets/StoryFormExportServer.js";
import {component as assetsManager} from "./AssetsManagerWidget.js";
import Mission from "../js/Mission.js";

export var vm = null;
const component = {
	el: '#editor',
	i18n: i18n,
	data() {
		return {
			copiedMission: null,
			saveStory: false,
			localStories: [],
			remoteStories: [], // names
			delayForNextRemoteRequest: 5000,
			I18nUtils: I18nUtils,
			locale: '',
			localesList: [],
			cache: {
				story: { // data to export
					/* each category have a dependency object as follows:
					{
						asset: Asset | object 	-> (not) parsed asset object
						count: Number 			-> count of stuffs that use this dependency (should be removed from category if <= 0)
					}
					 */
					dependencies: {
						// locales dependencies have i18n code as key and a dependency object as value
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
					activities: [],
				},
				mission: null,
				activity: null
			}
		}
	},
	components: {
		'i18n-selector-widget': asyncLoadComponentI18nSelectorWidget,
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'story-editor-widget': storyEditorComponent,
		'activity-editor-widget': activityEditorComponent,
		"assets-manager": assetsManager,

		"form-import-file": formImportFile,
		"form-import-server": formImportServer,
		"form-export-file": formExportFile,
		"form-export-server": formExportServer,
	},
	computed: {
		canExport: function () { return this.cache.story && this.cache.story.missions && this.cache.story.missions.length > 0; },
		canImport: function () { return true; }
	},
	watch: {
		'locale' : function ( newLocale ) {
			console.info("[Editor]","Updated current", "locale", newLocale );
		},
		'cache.mission': function( newVal ) {
			console.info("[Editor]","Updated current", "mission", newVal );
		},
		'cache.activity': function( newVal ) {
			console.info("[Editor]","Updated current", "activity", newVal );
		}
	},
	beforeMount: function() {
		let self = this;
		function keepFetch() {
			self.getRemoteStoryNames()
				.catch( (e) => {
					console.error( "[StoryEditor]", "Unable getting remote story names");
					setTimeout( keepFetch, self.delayForNextRemoteRequest )
				});
		}
		keepFetch();
	},
	methods: {
		load( data ) {
			let value = this.cache.story;
			let keys = Object.keys(data);
			for (let i = 0; i < data.missions.length; i++) {
				data.missions[ i ] = new Mission( data.missions[ i ] );
			}
			for( let i = 0; i < keys.length; i++ ){
				this.$set( value, keys[i], data[ keys[i]] );
			}
			this.localesList = data.dependencies && data.dependencies.locales ? Object.keys( data.dependencies.locales ) : [];
		},
		getRemoteStoryNames() {
			let self = this;
			return $.get( `/stories/` )
				.done(names => {
					if( names ) self.remoteStories = names;
				});
		},
		addToLocalStories( story ) {
			this.localStories.push(story);
		},
		deleteFromLocalStories( name ) {
			this.localStories = this.localStories.filter(function( story ) {
				return story.name !== name;
			});
		},
		changeSelectedStory( name ) {
			let story = this.localStories.find(function( story ) {
				return story.name === name;
			});
			if (story) {
				this.cache.story = story;

				let getlocale;
				Object.keys( this.cache.story.dependencies.locales ).forEach( locale => {
					getlocale = self.$i18n.getLocaleMessage( locale );
					getlocale.assets = {};
					self.$i18n.setLocaleMessage( locale, getlocale );
					self.$i18n.mergeLocaleMessage( locale, this.cache.story.dependencies.locales[locale] );
				});
			}
		},
		selectMission( index ) {
			this.cache.mission = this.cache.story.missions[index];
		},
		onActivitesTab() {
			if(this.$refs.activity) {
				this.$refs.activity.isEditFormVisible = false;
				if(this.$refs.treeView) {
					this.$refs.activity.$refs.treeView.redraw();
				}
			}
		},
		copyMission( mission ) {
			this.copiedMission = mission;
			this.copiedMission.locales = {};

			let missionLocales;
			for (const locale of this.localesList){
				if (this.cache.story.dependencies.locales[locale]) {
					missionLocales = this.cache.story.dependencies.locales[locale].assets.mission;
					if (missionLocales[this.copiedMission.id]) {
						this.copiedMission.locales[locale] = missionLocales[this.copiedMission.id];
					}
				}
			}
		}
	}
}

export function main() {

	let promiseNativeLocale = I18nUtils.fetchLocales( "./", i18n.locale );
	let promiseFallbackLocale = I18nUtils.fetchLocales( "./", i18n.fallbackLocale );

	Promise.all( [ promiseNativeLocale, promiseFallbackLocale] )
	.then((localesMessages) => {
		for (let i = 0; i < localesMessages.length; i++) {
			let data = localesMessages[ i ];
			if( data ) {
				Object.keys( data ).forEach( locale => component.i18n.mergeLocaleMessage( locale, data[ locale ] ) );
			}
		}
	})
	.catch( error => { console.error( "Error while getting localesData, continue offline ...", error ); })
	.finally( function () {
		vm = new Vue( component );
	});

}
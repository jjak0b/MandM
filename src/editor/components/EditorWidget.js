import { i18n } from "../../shared/js/i18n.js";
import { I18nUtils } from "../../shared/js/I18nUtils.js";
import { component as i18nSelectorComponent, asyncLoad as asyncLoadComponentI18nSelectorWidget } from "./i18nWidgets/I18nSelectorWidget.js";
import { component as i18nInputComponent, asyncLoad as asyncLoadComponentI18nInputWidget } from "./i18nWidgets/I18nInputWidget.js";
import { component as storyEditorComponent } from "./StoryEditorWidget.js";
import { component as activityEditorComponent } from "./ActivityEditorWidgets/ActivityEditorWidget.js";
import {component as formImportFile} from "./StoryEditorWidgets/StoryFormImportFile.js";
import {component as formImportServer} from "./StoryEditorWidgets/StoryFormImportServer.js";
import {component as formExportFile} from "./StoryEditorWidgets/StoryFormExportFile.js";
import {component as formExportServer} from "./StoryEditorWidgets/StoryFormExportServer.js";
import {component as assetsManager} from "./AssetsManagerWidget.js";
import { component as styleEditor } from "./StyleEditorWidget.js";
import Mission from "../../shared/js/Mission.js";
import Story from "../../shared/js/Story.js";

export var vm = null;
const component = {
	el: '#editor',
	i18n: i18n,
	data() {
		return {
			copiedActivity: null,
			grabbedActivity: null,
			copiedMission: null,
			localStories: [],
			remoteStories: [], // names
			delayForNextRemoteRequest: 5000,
			I18nUtils: I18nUtils,
			locale: '',
			localesList: [],
			cache: {
				story: new Story( null ),
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
		"style-editor-widget": styleEditor
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
			this.localesList = data && data.dependencies && data.dependencies.locales ? Object.keys( data.dependencies.locales ) : [];
			this.$set( this.cache, "story", new Story( data ) );
			console.log("[EditorWidget]", "Loaded story", this.cache.story );
			return this.cache.story;
		},
		getRemoteStoryNames() {
			let self = this;
			return $.get( `/stories/` )
				.done(names => {
					if( names ) self.remoteStories = names;
				});
		},
		addToLocalStories( story ) {
			console.log("[StoryEditor]", `Added (or updated) the Story ${story.name} to local cache`);
			this.localStories.push(story);
		},
		deleteFromLocalStories( name ) {
			console.log("[StoryEditor]", `Deleted the Story ${name} from local cache`);
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
			this.copiedMission.locales = i18n.messages;
		},
		grabActivity( activity ) {
			this.grabbedActivity = activity;
			if ( this.grabbedActivity ) {
				this.grabbedActivity.locales = i18n.messages;
			}
		},
		copyActivity( activity ) {
			this.copiedActivity = activity;
			this.copiedActivity.locales = i18n.messages;
		},
		saveStory() {
			this.$refs.story.updateStoryOnServer();
		}
	}
}

export function main() {

	let promiselocales = I18nUtils.fetchLocales( "./", [ i18n.locale, i18n.fallbackLocale ] );

	promiselocales
	.then((localesMessages) => {
		component.i18n.mergeLocaleMessage( i18n.locale, localesMessages[ i18n.locale ] );
		component.i18n.mergeLocaleMessage( i18n.fallbackLocale, localesMessages[ i18n.fallbackLocale ] );
	})
	.catch( error => { console.error( "Error while getting localesData, continue offline ...", error ); })
	.finally( function () {
		vm = new Vue( component );
	});

}
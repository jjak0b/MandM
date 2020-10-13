import { i18n } from "./Translations.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";
import { component as i18nSelectorComponent, asyncLoad as asyncLoadComponentI18nSelectorWidget } from "./i18nWidgets/I18nSelectorWidget.js";
import { component as i18nInputComponent, asyncLoad as asyncLoadComponentI18nInputWidget } from "./i18nWidgets/I18nInputWidget.js";
import { component as storyEditorComponent } from "./StoryEditorWidget.js";
import { component as missionEditorComponent } from "./MissionEditorWidget.js";
import { component as activityEditorComponent } from "./ActivityEditorWidget.js";
import {component as formImportFile} from "./StoryEditorWidgets/StoryFormImportFile.js";
import {component as formImportServer} from "./StoryEditorWidgets/StoryFormImportServer.js";
import {component as formExportFile} from "./StoryEditorWidgets/StoryFormExportFile.js";
import {component as formExportServer} from "./StoryEditorWidgets/StoryFormExportServer.js";

export var vm = null;
const component = {
	el: '#editor',
	i18n: i18n,
	data() {
		return {
			remoteStories: null, // names
			delayForNextRemoteRequest: 5000,
			I18nUtils: I18nUtils,
			locale: null,
			localesList: [],
			cache: {
				story: { // data to export
					assets: {
						locales: {},
						captions: [],
						videos: [],
						images: []
					},
					missionNextId: 0,
					activityNextId: 0,
					missions: [],
					activities: [],
					assetNextId: 0
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
		'mission-editor-widget': missionEditorComponent,
		'activity-editor-widget': activityEditorComponent,

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
			for( let i = 0; i < keys.length; i++ ){
				this.$set( value, keys[i], data[ keys[i]] );
			}
			this.localesList = data.assets && data.assets.locales ? Object.keys( data.assets.locales ) : [];
		},
		getRemoteStoryNames() {
			let self = this;
			return $.get( `/stories/` )
				.done(names => {
					if( names ) self.remoteStories = names;
				});
		},
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
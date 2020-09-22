import { i18n } from "./Translations.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";
import { component as i18nSelectorComponent, asyncLoad as asyncLoadComponentI18nSelectorWidget } from "./I18nSelectorWidget.js";
import { component as i18nInputComponent, asyncLoad as asyncLoadComponentI18nInputWidget } from "./I18nInputWidget.js";
import { component as storyEditorComponent } from "./StoryEditorWidget.js";
import { component as missionEditorComponent } from "./MissionEditorWidget.js";
import { component as activityEditorComponent } from "./ActivityEditorWidget.js";

export var vm = null;
const component = {
	el: '#editor',
	i18n: i18n,
	data() {
		return {
			locale: null,
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
		'activity-editor-widget': activityEditorComponent
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

	}
}

I18nUtils.fetchLocales( "./", i18n.locale )
	.then((data) => {
		if( data ) {
			Object.keys( data ).forEach( locale => component.i18n.mergeLocaleMessage( locale, data[ locale ] ) );
		}
	})
	.catch( error => { console.error( "Error while getting localesData, continue offline ..."); })
	.finally( function () {
		vm = new Vue( component );
	});

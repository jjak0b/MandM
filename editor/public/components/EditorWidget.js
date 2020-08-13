import {template} from "./EditorWidgetTemplate.js"
import { i18n, i18nContent } from "./Translations.js";
import { component as i18nSelectorComponent, asyncLoad as asyncLoadComponentI18nSelectorWidget } from "./I18nSelectorWidget.js";
import { component as i18nInputComponent, asyncLoad as asyncLoadComponentI18nInputWidget } from "./I18nInputWidget.js";
import { component as storyEditorComponent } from "./StoryEditorWidget.js";
import { component as missionEditorComponent } from "./MissionEditorWidget.js";
import { component as activityEditorComponent } from "./ActivityEditorWidget.js";

export const component = {
	template: template,
	data() {
		return {
			locale: null,
			cache: {
				story: { // data to export
					missionNextId: 0,
					activityNextId: 0,
					missions: [],
					activities: []
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
			i18nContent.locale = newLocale;
			console.info("[Editor]","Updated current", "locale", newLocale );
		},
		'cache.mission': function( newVal ) {
			console.info("[Editor]","Updated current", "mission", newVal );
		},
		'cache.activity': function( newVal ) {
			console.info("[Editor]","Updated current", "activity", newVal );
		}
	}
}

Vue.component( 'editor-widget', component );

export const vm = new Vue( {
	el: '#editor-widget',
	i18n,
	beforeMount: function() {
		let self = this;

	}
});


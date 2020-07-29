import {template} from "./EditorWidgetTemplate.js"
import {i18n, localesData} from "./Translations.js";
import { component as i18nSelectorComponent, asyncLoad as asyncLoadComponentI18nSelectorWidget } from "./I18nSelectorWidget.js";
import { component as i18nInputComponent, asyncLoad as asyncLoadComponentI18nInputWidget } from "./I18nInputWidget.js";
import {component as missionEditorComponent } from "./MissionEditorWidget.js";

export const component = {
	template: template,
	data() {
		return {
			localesData: localesData,
			locale: null,
			missions: [],
			activities: []
		}
	},
	components: {
		'i18n-selector-widget': asyncLoadComponentI18nSelectorWidget,
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'mission-editor-widget': missionEditorComponent
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


import {template} from "./UserWidgetEditorTextInputTemplate.js";
import {component as textInputComponent} from "../../../../shared/components/UserWidgetTextInput.js";
import {component as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";
import {I18nUtils} from "../../../../shared/js/I18nUtils.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String,
		localesList: Array,
		localeLabel: String
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		"user-widget-text-input": textInputComponent
	}
}
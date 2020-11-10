import {template} from "./UserWidgetEditorTextContentTemplate.js";
import {component as textContentEditor} from "../../i18nWidgets/I18nEditorWidget.js";
import {component as textContentComponent} from "../../../../shared/components/UserWidgetTextContent.js";
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
		"text-editor": textContentEditor,
		"text-content": textContentComponent
	}
}
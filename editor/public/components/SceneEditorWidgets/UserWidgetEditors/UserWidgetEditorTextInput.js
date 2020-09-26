import {template} from "./UserWidgetEditorTextInputTemplate.js";
import {component as textInputComponent} from "/shared/components/UserWidgetTextInput.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String
	},
	components: {
		"user-widget-textInput": textInputComponent
	}
}
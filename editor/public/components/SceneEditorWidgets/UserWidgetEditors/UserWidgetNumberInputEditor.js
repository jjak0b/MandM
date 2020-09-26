import {template} from "./UserWidgetNumberInputEditorTemplate.js";
import {component as numberInputComponent} from "/shared/components/UserWidgetNumberInput.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String
	},
	components: {
		"user-widget-numberInput": numberInputComponent
	}
}
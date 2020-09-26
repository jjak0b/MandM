import {template} from "./UserWidgetEditorSpinbuttonTemplate.js";
import {component as spinbuttonComponent} from "/shared/components/UserWidgetSpinbutton.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String
	},
	components: {
		"user-widget-spinbutton": spinbuttonComponent
	}
}
import {template} from "./UserWidgetEditorSpinbuttonTemplate.js";
import {component as spinbuttonComponent} from "../../../../shared/components/UserWidgetSpinbutton.js";
import ComponentSpinbutton from "../../../../shared/js/Scene/SceneComponents/ComponentSpinbutton.js";

export const component = {
	template: template,
	props: {
		component: ComponentSpinbutton,
		locale: String
	},
	components: {
		"user-widget-spinbutton": spinbuttonComponent
	}
}
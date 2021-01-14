import ComponentGrid from "../../../../shared/js/Scene/SceneComponents/ComponentGrid";
import {template} from "./UserWidgetEditorGridTemplate.js";

export const component = {
	template: template,
	props: {
		component: ComponentGrid,
		locale: String
	},
	data() {
		return {

		}
	},
	methods: {
		isClassValid( array, classname ) {
			return !array.includes( classname );
		}
	}
}
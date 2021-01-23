import ComponentGrid from "../../../../shared/js/Scene/SceneComponents/ComponentGrid.js";
import {template} from "./UserWidgetEditorGridTemplate.js";
import {component as attributeClassEditorWidget} from "../AttributeClassEditorWidget.js";

export const component = {
	template: template,
	components: {
		attributeClassEditorWidget
	},
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
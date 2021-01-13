import {template} from "./SceneViewportTemplate.js";
import Scene from "../../shared/js/Scene/Scene.js";
import { component as userWidgetViewport} from "../../shared/components/UserWidgetViewport.js";

export const component = {
	template: template,
	components: {
		userWidgetViewport: userWidgetViewport
	},
	props: {
		value: Scene
	},
	watch: {
		value( newScene ) {
			// avoid vue native caching
			this.$refs.scene.$destroy();
		}
	}
}
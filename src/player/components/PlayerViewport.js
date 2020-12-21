import {template} from "./PlayerViewportTemplate.js";
import {component as sceneViewportComponent} from "./SceneViewport.js";
import ActivityNode from "../../shared/js/ActivityNodes/ActivityNode.js";
import ActivityDataSceneable from "../../shared/js/ActivityNodes/ActivityDataTypes/ActivityDataSceneable.js";

export const component = {
	template: template,
	components: {
		"scene-viewport": sceneViewportComponent
	},
	props: {
		activity: ActivityNode
	},
	data() {
		return {

		}
	},
	computed : {
		isSceneable() { return this.activity && this.activity.data && this.activity.data instanceof ActivityDataSceneable },
		scene() { return this.isSceneable ? this.activity.data.scene : null }
	}
}
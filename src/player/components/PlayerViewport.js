import {template} from "./PlayerViewportTemplate.js";
import {component as sceneViewportComponent} from "./SceneViewport.js";

export const component = {
	template: template,
	components: {
		"scene-viewport": sceneViewportComponent
	}
}
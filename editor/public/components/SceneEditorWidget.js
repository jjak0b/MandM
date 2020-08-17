import { template } from "./SceneEditorWidgetTemplate.js"
import { component as inputRangeNumberComponent} from "./SceneEditorWidgets/InputRangeNumberWidget.js";
import { component as mediaFormComponent } from "./SceneEditorWidgets/MediaFormWidget.js";

export const component = {
	template: template,
	props: {
		locale: String,
		nextAssetId: Number
	},
	components : {
		"input-range-number-widget" : inputRangeNumberComponent,
		"media-form-widget": mediaFormComponent,
	},
	data() {
		return {
			size : {
				x: 100,
				y: 100
			},
			angles: {
				x: 0,
				y: 0,
				z: 0
			},
			position: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}
		}
	}
};
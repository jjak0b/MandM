import {template} from "./StyleEditorWidgetTemplate.js";
import {component as inputRangeNumberComponent} from "./InputRangeNumberWidget.js";

export const component = {
	template: template,
	components: {
		"input-range-number-widget" : inputRangeNumberComponent,
	},
	props: {
		value: String
	}
};
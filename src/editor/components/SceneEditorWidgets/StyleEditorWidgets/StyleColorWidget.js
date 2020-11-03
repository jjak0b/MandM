import {template} from "./StyleColorWidgetTemplate.js";
const ColorPicker = import( "/libs/vue-accessible-color-picker/vue-accessible-color-picker.js" );

Vue.use(ColorPicker);

export const component = {
	template: template,
	props: {
		value: String
	}
}

import {template} from "./ListWidgetTemplate.js";

export const component = {
	template: template,
	props: {
		"list": Object,
		"tag": String,
		"value": Object, // keys of item list that is selected
	}
};
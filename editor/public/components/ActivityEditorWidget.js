import {template} from "./ActivityEditorWidgetTemplate.js";

export const component = {
	template: template,
	props: {
		"locale": String,
		"localesData": Object,
		"missions" : Array,
		"activities": Array
	}
};

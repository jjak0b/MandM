import {template} from "./GridWidgetTemplate.js";
import {component as gridWidget } from "./GridWidget.js";

export const component ={
	template: template,
	components: {
		gridWidget
	},
	props: {
		locale: String,

		gridData: Array,
		// roles
		gridRole: String,
		rowRole: String,
		cellRole: String,

		// tags
		gridTag: String,
		rowTag: String,
		cellTag: String,

		// classes
		gridClass: [Array, String],
		rowClass: [Array, String],
		cellClass: [Array, String],

		// custom props
		selectable: Boolean
	}
}
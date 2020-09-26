import {template} from "./UserWidgetEditorRangeTemplate.js";
import {component as rangeComponent} from "/shared/components/UserWidgetRange.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String
	},
	components: {
		"user-widget-range": rangeComponent
	}
}
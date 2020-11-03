import {template} from "./InputRangeNumberWidgetTemplate.js";

export const component = {
	template: template,
	props: {
		value: Number,
		name: String,
		labelRange: String,
		labelNumber: String,
		min: Number,
		max: Number,
		step: Number
	},
	watch: {
		"value" : function (newVal, oldVal) {
			this.$emit( "input", newVal );
		}
	}
};
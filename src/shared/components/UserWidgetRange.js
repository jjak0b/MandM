import {template} from "./UserWidgetRangeTemplate.js";

export const component = {
	template: template,
	props: {
		extremes: Boolean,
		min: Number,
		max: Number
	},
	computed: {
		realMin: function () { return this.min ? this.min : 0 },
		realMax: function () { return this.max ? this.max : 100 }
	}
};
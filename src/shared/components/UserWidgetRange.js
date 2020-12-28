import {template} from "./UserWidgetRangeTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

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
	},
	methods: {
		emitInput(event) {
			let item = new TypedValue({type: Number.name, value: event});
			this.$emit('input', item);
		}
	}
};
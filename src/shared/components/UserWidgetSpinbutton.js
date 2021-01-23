import {template} from "./UserWidgetSpinbuttonTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

export const component = {
	template: template,
	props: {
		classes: Array,
	},
	methods: {
		emitInput(event) {
			let item = new TypedValue({type: Number.name, value: event});
			this.$emit('change', item);
		}
	}
};
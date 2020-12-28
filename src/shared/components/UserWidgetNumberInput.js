import {template} from "./UserWidgetNumberInputTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

export const component = {
	template: template,
	methods: {
		emitInput(event) {
			let item = new TypedValue({type: Number.name, value: event});
			this.$emit('input', item);
		}
	}
};
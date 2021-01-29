import {template} from "./UserWidgetSpinbuttonTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

export const component = {
	template: template,
	props: {
		classes: Array,
		data: Object,
		value: Object
	},
	methods: {
		emitInput(event) {
			this.value.type = Number.name;
			this.value.value = event;
		}
	}
};
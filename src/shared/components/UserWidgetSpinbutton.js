import {template} from "./UserWidgetSpinbuttonTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

export const component = {
	template: template,
	props: {
		classes: Array,
		data: Object,
		value: Object
	},
	data() {
		return {
			timer: null
		}
	},
	methods: {
		emitInput(event) {
			if ( this.timer ) {
				clearTimeout( this.timer );
			}

			this.timer = setTimeout( () => {
				this.value.type = Number.name;
				this.value.value = event;
				this.$el.dispatchEvent(new Event('change', { bubbles: true }));
			}, 1500 )

		}
	}
};
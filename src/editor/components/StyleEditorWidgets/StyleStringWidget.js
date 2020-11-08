import {template} from "./StyleStringWidgetTemplate.js";

export const component = {
	template: template,
	props: {
		value: {
			type: String,
			default: "initial"
		},
		defaultValues: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			acceptedDefaultValues: [
				"initial",
				"inherit",
				"unset"
			],
		}
	},
	beforeMount() {
		if( this.defaultValues ) {
			this.defaultValues.forEach( (value, index) => {
				if( !this.acceptedDefaultValues.includes( value ) ) {
					this.acceptedDefaultValues.push( value )
				}
			});
		}
	}
};
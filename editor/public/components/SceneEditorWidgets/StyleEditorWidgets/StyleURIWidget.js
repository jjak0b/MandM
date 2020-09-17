import {template} from "./StyleURIWidgetTemplate.js";

export const component = {
	template: template,
	props: {
		value: {
			type: String,
			default: "none"
		},
		defaultValues: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			acceptedDefaultValues: [
				"none",
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
		// TODO: perform ajax request to BACKEND for assets and fill datalist
	}
}
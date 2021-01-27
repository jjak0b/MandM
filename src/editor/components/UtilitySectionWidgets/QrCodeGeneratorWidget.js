import {template} from "./QrCodeGeneratorTemplate.js";

export const component = {
	template: template,
	props: {
		value: Array
	},
	data() {
		return {
			newItem: {
				name: null,
				value: ""
			},
			settings: {
				size: "300",
			}
		}
	},
	methods: {
		onAdd() {
			if( this.newItem && this.newItem.name ) {
				this.value.push( this.newItem );
				this.newItem = {
					name: null,
					value: ""
				}
			}
		},
		onRemove( index ) {
			this.value.splice( index, 1 );
		}
	}
}
import {template} from "./UserWidgetInputTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

export const component = {
	inheritAttrs: false,
	template: template,
	props: {
		classes: Array,
		value: Object,
		type: String,
		min: String,
		max: String,
		extremes: Boolean,
		step: String,
		locale: String,
		localeLabel: String
	},
	methods: {
		emitInput(event){
			let type = this.type;
			let item = null;
			switch( type ) {
				case "number":
				case "range":
					item = new TypedValue( { type: Number.name, value: parseFloat( event ) } );
					break;
				case "text":
					item = new TypedValue( { type: String.name, value: event } );
				default:
					break;
			}
			this.$emit('input', item);
		},
		getContent(){
			let content = this.$i18n.t( this.localeLabel, this.locale );
			if( !content || content === this.localeLabel )
				return "";
			else
				return content;
		}
	}
};
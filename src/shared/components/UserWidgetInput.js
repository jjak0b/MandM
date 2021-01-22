import {template} from "./UserWidgetInputTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

export const component = {
	template: template,
	props: {
		type: String,
		min: String,
		max: String,
		extremes: Boolean,
		step: String,
		locale: String,
		localeLabel: String
	},
	methods: {
		emitInput(event, type){
			let item = null;
			if ( type === 'number' || type === 'range' ) item = new TypedValue( { type: Number.name, value: event } );
			else if ( type === 'string' ) item = new TypedValue( { type: String.name, value: event } );
			this.$emit('change', item);
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
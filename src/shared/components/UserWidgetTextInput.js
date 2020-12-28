import {template} from "./UserWidgetTextInputTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

export const component = {
	template: template,
	props: {
		localeLabel: String,
		locale: String,
		localesList: Array
	},
	methods: {
		emitInput(event){
			let item = new TypedValue( { type: String.name, value: event } );
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
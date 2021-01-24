import {template} from "./UserWidgetButtonTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

export const component = {
	inheritAttrs: false,
	template: template,
	props: {
		classes: Array,
		type: String,
		size: String,
		variant: String,
		shape: String,
		disabled: Boolean,
		value: Object,
		locale: String,
		localeLabel: String
	},
	methods: {
		emitInput(event){
			this.$emit('input', this.value);
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
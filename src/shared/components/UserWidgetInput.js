import {template} from "./UserWidgetInputTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

export const component = {
	inheritAttrs: false,
	template: template,
	props: {
		tabindex: [Number,String],
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
			switch( type ) {
				case "number":
					this.value.value = parseInt(event);
					this.value.type = Number.name;
					break;
				case "range":
					this.value.value = parseInt(event);
					this.value.type = Number.name;
					break;
				case "text":
					this.value.type = String.name;
					break;
				default:
					break;
			}
			this.$emit( 'change', this.value );
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
import {template} from "./UserWidgetButtonTemplate.js";
import {TypedValue} from "../js/Types/TypedValue.js";

export const component = {
	inheritAttrs: false,
	template: template,
	props: {
		tabindex: [Number,String],
		classes: Array,
		type: String,
		size: String,
		variant: String,
		shape: String,
		disabled: Boolean,
		value: Object,
		valueOnClick: Object,
		locale: String,
		localeLabel: String
	},
	methods: {
		emitInput(event){
			this.value.type = this.valueOnClick.type;
			this.value.value = this.valueOnClick.value;
			this.$el.dispatchEvent(new Event('change', { bubbles: true }));
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
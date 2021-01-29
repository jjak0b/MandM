import {template} from "./UserWidgetButtonTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

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
		locale: String,
		localeLabel: String
	},
	methods: {
		getContent(){
			let content = this.$i18n.t( this.localeLabel, this.locale );
			if( !content || content === this.localeLabel )
				return "";
			else
				return content;
		}
	}
};
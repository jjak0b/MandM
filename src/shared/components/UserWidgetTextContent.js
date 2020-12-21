import {template} from "./UserWidgetTextContentTemplate.js";

export const component = {
	template: template,
	props: {
		locale: String,
		localeLabel: String,
		localesList: Array
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
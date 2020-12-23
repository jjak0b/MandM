import {template} from "./UserWidgetCheckboxTemplate.js";

export const component = {
	template: template,
	props: {
		options: Array,
		locale: String,
		localesList: Array
	},
	methods: {
		getContent( localeLabel ){
			let content = this.$i18n.t( localeLabel, this.locale );
			if( !content || content === localeLabel )
				return "";
			else
				return content;
		}
	}
};
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
			if( this.$i18n.te( this.localeLabel, this.locale) )
				return this.$i18n.t( this.localeLabel, this.locale );
			return ""
		}
	}
};
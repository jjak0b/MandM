import {template} from "./UserWidgetTextInputTemplate.js";

export const component = {
	template: template,
	props: {
		localeLabel: String,
		locale: String,
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
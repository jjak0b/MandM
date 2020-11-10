import {template} from "./UserWidgetSelectTemplate.js";

export const component = {
	template: template,
	props: {
		options: Array,
		locale: String,
		localesList: Array
	},
	methods: {
		getContent( localeLabel ){
			if( this.$i18n.te( localeLabel, this.locale) )
				return this.$i18n.t( localeLabel, this.locale );
			return ""
		}
	}
};
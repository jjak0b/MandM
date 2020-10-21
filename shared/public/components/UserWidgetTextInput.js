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
			if(this.locale) {
				if( !this.$i18n.te( this.localeLabel, this.locale ) ) {
					if( this.$i18n.te( this.localeLabel, 'en-US' ) ) {
						return this.$i18n.t(this.localeLabel, 'en-US');
					}
					else {
						for (const locale of this.localesList) {
							if( this.$i18n.te( this.localeLabel, locale ) ) {
								return this.$i18n.t(this.localeLabel, locale );
							}
						}
					}
				}
				if (this.$i18n.te(this.localeLabel, this.locale))
					return this.$i18n.t(this.localeLabel, this.locale);
			}
			return ""
		}
	}
};
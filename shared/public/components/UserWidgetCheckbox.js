import {template} from "./UserWidgetCheckboxTemplate.js";

export const component = {
	template: template,
	props: {
		options: Array,
		locale: String,
		localesList: Array,
		assetId: Number
	},
	methods: {
		getContent( localeLabel ){
			if(this.locale) {
				if( !this.$i18n.te( localeLabel, this.locale ) ) {
					if( this.$i18n.te( localeLabel, 'en-US' ) ) {
						return this.$i18n.t(localeLabel, 'en-US');
					}
					else {
						for (const locale of this.localesList) {
							if( this.$i18n.te( localeLabel, locale ) ) {
								return this.$i18n.t(localeLabel, locale );
							}
						}
					}
				}
				if (this.$i18n.te(localeLabel, this.locale))
					return this.$i18n.t(localeLabel, this.locale);
			}
			return ""
		}
	}
};
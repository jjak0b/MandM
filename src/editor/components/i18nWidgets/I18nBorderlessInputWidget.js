import {template} from "./I18nBorderlessInputWidgetTemplate.js";
import { i18n } from "../../../shared/js/i18n.js";
import { I18nUtils } from "../../../shared/js/I18nUtils.js";

export const component = {
	i18n: i18n,
	template: template,
	props: {
		locale: String,
		localeLabel: String,
		localesList: Array
	},
	data() {
		return {
			I18nUtils: I18nUtils
		}
	},
	methods: {
		setContent(value) {
			if(this.locale) {
				let obj = I18nUtils.buildObjectFromLabel(this.localeLabel, value);
				this.$i18n.mergeLocaleMessage(this.locale, obj);
			}
		},
		getContent(){
			if( this.$i18n.te( this.localeLabel, this.locale) )
				return this.$i18n.t( this.localeLabel, this.locale );
			return ""
		}
	},
}
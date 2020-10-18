import {template} from "./UserWidgetTextContentTemplate.js";
import { i18n } from "/edit/components/Translations.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";

export const component = {
	i18n: i18n,
	template: template,
	props: {
		localHTML: String,
		locale: String,
		nextAssetId : Number
	},
	watch: {
		localHTML: function (newValue) {
			this.setContentOf( this.locale, this.localeLabel, newValue);
		}
	},
	data() {
		return {
			I18nUtils: I18nUtils,
			localeLabel: "assets.text-content." + this.nextAssetId
		}
	},
	methods: {
		setContentOf( locale, label, value) {
			if(this.locale) {
				let obj = I18nUtils.buildObjectFromLabel(label, value);
				this.$i18n.mergeLocaleMessage(locale, obj);
			}
		},
		getContent(){
			if(this.locale) {
				if (this.$i18n.te(this.localeLabel, this.locale))
					return this.$i18n.t(this.localeLabel, this.locale);
			}
			return ""
		}
	}
};
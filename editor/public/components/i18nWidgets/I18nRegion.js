import {template} from "./I18nRegionTemplate.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";

export const component = {
	template: template,
	inheritAttrs: false,
	props: {
		locale: String
	},
	data() {
		return {
			I18nUtils: I18nUtils
		}
	}
};
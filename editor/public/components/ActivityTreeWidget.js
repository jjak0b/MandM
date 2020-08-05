import {template} from "./ActivityTreeWidgetTemplate.js";
import {i18n, i18nContent} from "./Translations.js";

export const component = {
	template: template,
	i18n: i18nContent,
	props: {
		value : Object,
		target: Object,
		locale : String
	}
};
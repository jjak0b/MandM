import {template} from "./AccessibleListWidgetTemplate.js";
import { component as borderlessInput } from "/edit/components/i18nWidgets/I18nBorderlessInputWidget.js"

export const component = {
	template: template,
	props: {
		locale: String,
		localesList: Array,
		items: Array,
		selected: Number
	},
	components: {
		'borderless-input': borderlessInput
	},
	methods: {
		select( index ) {
			this.selected = index;
		},
		isActive( index ) {
			return this.selected === index
		}
	}
};
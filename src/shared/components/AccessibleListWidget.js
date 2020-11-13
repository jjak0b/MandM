import {template} from "./AccessibleListWidgetTemplate.js";
import { component as borderlessInput } from "../../editor/components/i18nWidgets/I18nBorderlessInputWidget.js"

export const component = {
	template: template,
	props: {
		locale: String,
		localesList: Array,
		items: Array,
		selected: Number,
		title: String,
		copyPaste: {
			type: Boolean,
			default: true
		},
		disable: {
			type: Boolean,
			default: false
		},
		editable: {
			type: Boolean,
			default: true
		},
		variant: {
			type: String,
			default: 'info'
		}
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
		},
		getVariant(index) {
			if (this.disable && !this.items[index].active) {
				return 'secondary'
			}
			return null
		}
	}
};
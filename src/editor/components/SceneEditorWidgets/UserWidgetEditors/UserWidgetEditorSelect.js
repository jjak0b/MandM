import {template} from "./UserWidgetEditorSelectTemplate.js";
import {component as selectComponent} from "../../../../shared/components/UserWidgetSelect.js";
import {component as inputVal} from "../../InputValueWidget.js";
import {component as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";
import {component as listWidget} from "../../../../shared/components/AccessibleListWidget.js";
import {I18nUtils} from "../../../../shared/js/I18nUtils.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String,
		localesList: Array,
		component: Object
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		"user-widget-select": selectComponent,
		'list-widget': listWidget
	},
	data() {
		return {
			label: null
		}
	},
	methods: {
		onAdd() {
			this.label = this.component.i18nCategory + '.element.' + I18nUtils.getUniqueID();
			this.$bvModal.show('addSelectModal');
		},
		addElement() {
			this.$emit('addElement', {title: this.label} );
		},
		removeElement(index) {
			this.$emit('removeElement', index);
		}
	}
}
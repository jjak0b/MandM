import {template} from "./UserWidgetEditorCheckboxTemplate.js";
import {component as checkboxComponent} from "../../../../shared/components/UserWidgetCheckbox.js";
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
		"user-widget-checkbox": checkboxComponent,
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
			this.$bvModal.show('addCheckboxModal');
		},
		addElement() {
			this.$emit('addElement', {title: this.label} );
		},
		removeElement(index) {
			this.$emit('removeElement', index);
		}
	}
}
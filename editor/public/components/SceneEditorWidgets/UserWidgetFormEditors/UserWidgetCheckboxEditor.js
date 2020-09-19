import {template} from "./UserWidgetCheckboxEditorTemplate.js";
import {component as checkboxComponent} from "/shared/components/UserWidgetCheckbox.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String
	},
	components: {
		"user-widget-checkbox": checkboxComponent
	},
	data() {
		return {
			newElement: null,
			nextValue: 0
		}
	},
	methods: {
		addElement() {
			this.$emit('addElement', { value: this.nextValue++, text: this.newElement });
			this.newElement = null;
		},
		removeElement(index) {
			this.$emit('removeElement', index);
		}
	}
}
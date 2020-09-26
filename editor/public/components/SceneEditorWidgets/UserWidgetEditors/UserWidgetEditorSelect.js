import {template} from "./UserWidgetEditorSelectTemplate.js";
import {component as selectComponent} from "/shared/components/UserWidgetSelect.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String
	},
	components: {
		"user-widget-select": selectComponent
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
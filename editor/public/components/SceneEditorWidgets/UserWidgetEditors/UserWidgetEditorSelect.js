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
			newElement: "",
			nextValue: 0
		}
	},
	methods: {
		addElement() {
			this.$emit('addElement', { value: this.nextValue++, text: this.newElement });
			this.newElement = "";
		},
		removeElement(index) {
			this.$emit('removeElement', index);
		}
	}
}
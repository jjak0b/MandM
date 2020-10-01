import {template} from "./UserWidgetEditorCheckboxTemplate.js";
import {component as checkboxComponent} from "/shared/components/UserWidgetCheckbox.js";
import {component as inputVal} from "../../InputValueWidget.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String
	},
	components: {
		"user-widget-checkbox": checkboxComponent,
		'input-val':inputVal
	},
	data() {
		return {
			newElement: "",
			nextValue: 0
		}
	},
	methods: {
		addElement() {
			this.newElement.value = this.newElement.value;
			if (this.newElement.type === 'Array') {
				this.newElement.value = this.newElement.value.join(", ");
			}
			this.$emit('addElement', { value: this.nextValue++, text: this.newElement.value });
			this.newElement = "";
		},
		removeElement(index) {
			this.$emit('removeElement', index);
		},
		onInput( event ) {
			this.newElement = event;
		}
	}
}
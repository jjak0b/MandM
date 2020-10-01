import {template} from "./UserWidgetEditorRadioTemplate.js";
import {component as radioComponent} from "/shared/components/UserWidgetRadio.js";
import {component as inputVal} from "../../InputValueWidget.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String
	},
	components: {
		"user-widget-radio": radioComponent,
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
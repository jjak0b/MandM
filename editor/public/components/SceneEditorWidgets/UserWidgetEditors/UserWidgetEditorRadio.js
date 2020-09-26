import {template} from "./UserWidgetEditorRadioTemplate.js";
import {component as radioComponent} from "/shared/components/UserWidgetRadio.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String
	},
	components: {
		"user-widget-radio": radioComponent
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
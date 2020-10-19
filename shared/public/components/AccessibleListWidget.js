import {template} from "./AccessibleListWidgetTemplate.js";

export const component = {
	template: template,
	props: {
		locale: String,
		items: Array,
		selected: Number
	},
	data() {
		return {
		}
	},
	methods: {
		select( index ) {
			this.selected = index;
		},
		isActive( index ) {
			return this.selected === index
		},
		getVariant( index ) {
			return this.isActive(index) ? 'light' : 'primary'
		}
	}
};
import {template} from "./GridRowWidgetTemplate.js";
import {component as colComponent} from "./GridColWidget.js"

export const component = {
	template: template,
	components: {
		"column" : colComponent
	},
	props: {
		locale: String,
		value: Array,
		target: Array,
		rowIndex: Number,
		showCSSGrid: Boolean,
		localesList: Array,
		i18nCategory: String
	},
	data() {
		return {

		}
	},
	methods: {
		setCurrentIndex( index ) {
			this.$emit( 'setCol', index );
			this.$emit( 'setRow' );
		}
	}
}
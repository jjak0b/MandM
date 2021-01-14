import {template} from "./GridWidgetTemplate.js";
import {component as gridWidget } from "./GridWidget.js";
import {TypedValue} from "../js/Types/TypedValue.js";

export const component ={
	template: template,
	components: {
		gridWidget
	},
	props: {
		tabindex: [Number|String],
		locale: String,

		gridData: Array,
		// roles
		gridRole: String,
		rowRole: String,
		cellRole: String,

		// tags
		gridTag: String,
		rowTag: String,
		cellTag: String,

		// classes
		gridClass: [Array, String],
		rowClass: [Array, String],
		cellClass: [Array, String],
		cursorCellClass: [Array, String],
		selectedCellClass: [Array, String],

		// custom props
		useIndexes: {
			type: Boolean,
			default: true
		},
		navKey: {
			type: Boolean,
			default: true
		},
		selectable : {
			type: Boolean,
			default: false
		},
		preventFocus: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		onSelected( event ) {
			this.$emit(
				'input',
				new TypedValue({
					type: Array.name,
					value: event
				})
			)
		},
		getTabIndex( isFocused ) {
			if( this.navKey ) {
				return ( this.tabindex === null || this.tabindex === undefined ) ? (isFocused ? 0 : -1) : this.tabindex;
			}
			else {
				return this.tabIndex;
			}
		}
	}
}
import {template} from "./UserWidgetGridTemplate.js";
import {component as gridWidget } from "./GridWidget.js";
import {component as userWidgetViewport} from "./UserWidgetViewport.js";
import {TypedValue} from "../js/Types/TypedValue.js";

// circular dependency avoided with "user-widget-grid" using async component loading
export function component(resolve, reject) {
	resolve( {
		template: template,
		components: {
			gridWidget,
			userWidgetViewport: userWidgetViewport
		},
		props: {
			value: Array,
			tabindex: [Number, String],
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
			useIndexes: Boolean,
			navKey: Boolean,
			selectable : Boolean,
			preventFocus: Boolean
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
			getTabindex( isFocused ) {
				if( this.navKey ) {
					if( this.tabindex === undefined || this.tabindex == null ) {
						return (isFocused ? 0 : -1);
					}
					else {
						if( this.tabindex < 0 ) {
							// may be disabled by grid so disabled all widgets
							return this.tabindex;
						}
						else {
							return isFocused ? 0 : -1;
						}
					}
				}
				else {
					return this.tabIndex;
				}
			}
		}
	} );
}
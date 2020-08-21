import {template} from "./GridColWidgetTemplate.js";

export const component = {
	template: template,
	props: {
		value: Object,
		selected : Boolean,
		showCSSGrid: Boolean
	},
	data() {
		return {

		}
	},
	computed: {
		classes: function () {
			let classes = [];
			classes.push( ( this.value.colSize > 0 ? 'col-' + this.value.colSize : 'col') );
			if( this.showCSSGrid || this.selected ) {
				classes.push( 'rounded-0 border' );
				if( this.selected ) {
					classes.push( 'border-primary' );
				}
				else{
					classes.push( 'border-danger' );
				}
			}
			return classes;
		}
	},
	watch: {
		"selected" : function (newVal, oldVal) {
			if(newVal) {
				this.$el.focus();
				this.$emit("currentCellData", this.value );
			}
		}
	},
}
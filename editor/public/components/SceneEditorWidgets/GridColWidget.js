import {template} from "./GridColWidgetTemplate.js";

export const component = {
	template: template,
	props: {
		value: Object,
		target: Array,
		coords: Array,
		showCSSGrid: Boolean
	},
	data() {
		return {
			isSelected: false
		}
	},
	computed: {
		classes: function () {
			let classes = [];
			classes.push( ( this.value.colSize > 0 ? 'col-' + this.value.colSize : 'col') );
			if( this.showCSSGrid || this.isSelected ) {
				classes.push( 'rounded-0 border' );
				if( this.isSelected ) {
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
		"target": function (newVal) {
			this.updateFocus();
		}
	},
	mounted() {
		this.updateFocus();
	},
	methods: {
		focusMe() {
			this.$el.focus();
		},
		updateFocus(){
			if(this.target && this.target[0] == this.coords[0] &&this.target[1] == this.coords[1] ) {
				this.isSelected = true;
				this.focusMe();
			}
			else{
				this.isSelected = false;
			}
		},
		onFocus() {
			this.$emit('setCursor', this.coords );
		}
	}
}
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
		},
		"value" : {
			deep: true,
			handler: function ( value ) {
				console.warn("update");
				if( value && value.component && value.component.style ) {
					let dummy = $( this.$refs.styleEl )[0];
					$(dummy).css( "transform", `rotateX(${this.value.component.style.angles.x}) rotateY(${ this.value.component.style.angles.y }) rotateZ(${ this.value.component.style.angles.z })` );
					$(dummy).css( "position", "relative" );
					$(dummy).css( "left", this.value.component.style.position.left + "%" );
					$(dummy).css( "right", this.value.component.style.position.right + "%" );
					$(dummy).css( "top", this.value.component.style.position.top + "%" );
					$(dummy).css( "bottom", this.value.component.style.position.bottom + "%" );
				}
			}
		}
	},
	mounted() {
		this.updateFocus();
	},
	methods: {
		focusMe() {
			this.$el.focus();
			this.$emit("currentCellData", this.value );
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
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
		style: function () {
			return (!this.showCSSGrid)
				?	""
				:	`border-width: 0.25em;
					border-color: #000000;
					border-style: solid;`;
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
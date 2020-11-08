import {template} from "./StyleSelectorFieldsetTemplate.js";
import StyleSelector from "../../../shared/js/StyleData/StyleSelector.js";

export const component = {
	template: template,
	props: {
		selector: StyleSelector
	},
	data() {
		let data = {
			shouldUseCustomSelector: false,
			pseudo: {
				classes: [
					"active",
					"checked",
					"default",
					"defined",
					"disabled",
					"empty",
					"enabled",
					"first",
					"first-child",
					"first-of-type",
					"focus",
					"focus-within",
					"hover",
					"in-range",
					"invalid",
					"last-child",
					"last-of-type",
					"link",
					"only-child",
					"only-of-type",
					"optional",
					"out-of-range",
					"required",
					"valid",
					"visited",
				],
				elements: [
					"before",
					"after",
					"cue",
					"cue-region",
					"first-letter",
					"first-line",
					"selection"
				]
			}
		}
		return data;
	},
	watch: {
		"selector": {
			deep: true,
			handler: function (newVal) {
				this.$emit( "input", this.toSelector() );
			}
		},
		shouldUseCustomSelector : function (useCustom) {

		}
	},
	methods: {
		toSelector() {
			let value = "";

			let self = this;
			Object.keys( this.selector ).forEach( (key) => {
				if( self.selector[ key ] && typeof self.selector[ key ] == "string" && self.selector[ key ].length > 0 )
					self.$set( self.selector, key, self.selector[ key ].trim() );
			});

			return value.length > 0 ? value : null;
		}
	}

}
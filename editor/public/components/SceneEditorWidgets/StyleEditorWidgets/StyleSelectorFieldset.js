import {template} from "./StyleSelectorFieldsetTemplate.js";

export const component = {
	template: template,
	data() {
		let data = {
			shouldUseCustomSelector: false,
			selector: {
				custom: null,
				tag: null,
				class: null,
				id: null,
				attrName: null,
				attrOp: null,
				attrValue: null,
				case: [],
				pseudoClass: null,
				pseudoElement: null
			},
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
		}
	},
	methods: {
		toSelector() {
			let value = "";

			if( this.shouldUseCustomSelector ){
				if( this.selector.custom && this.selector.custom.length > 0)
					value = this.selector.custom;
			}
			else{
				if( this.selector.tag && this.selector.tag.length > 0 )
					value += this.selector.tag;

				if( this.selector.class && this.selector.class.length > 0 )
					value += `.${this.selector.class}`;

				if( this.selector.id && this.selector.id.length > 0 )
					value += `#${this.selector.id}`;

				if( (this.selector.attrName && this.selector.attrName.length > 0)
					&& ( this.selector.attrOp && this.selector.attrOp.length > 0 )
					&& ( this.selector.attrValue && this.selector.attrValue.length > 0 ) ) {
					let caseInsensitive = this.selector.case || "";
					value += `[ ${this.selector.attrName} ${this.selector.attrOp} "${this.selector.attrValue}" ${caseInsensitive}]`;
				}

				if( this.selector.pseudoClass && this.selector.pseudoClass.length > 0 )
					value += `:${this.selector.pseudoClass}`;

				if( this.selector.pseudoElement && this.selector.pseudoElement.length > 0 )
					value += `::${this.selector.pseudoElement}`;

			}
			return value.length > 0 ? value : null;
		}
	}

}
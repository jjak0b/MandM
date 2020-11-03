import {template} from "./StyleSelectorFieldsetTemplate.js";

export const component = {
	template: template,
	props: {
		selector: Object
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
		}
	},
	beforeMount() {
		this.$set(this.selector, 'custom', null );
		this.$set(this.selector, 'tag', "*" );
		this.$set(this.selector, 'class', null );
		this.$set(this.selector, 'id', null );
		this.$set(this.selector, 'attrName', null );
		this.$set(this.selector, 'attrOp', null );
		this.$set(this.selector, 'attrValue', null );
		this.$set(this.selector, 'case', [] );
		this.$set(this.selector, 'pseudoClass', null );
		this.$set(this.selector, 'pseudoElement', null );
		this.$set(this.selector, 'toString',
			function (){
				let value = "";
				if( this.custom && this.custom.length > 0) {
					value = this.custom;
				}
				else{
					if( this.tag && this.tag.length > 0 )
						value += this.tag;

					if( this.class && this.class.length > 0 )
						value += `.${this.class}`;

					if( this.id && this.id.length > 0 )
						value += `#${this.id}`;

					if( (this.attrName && this.attrName.length > 0)
						&& ( this.attrOp && this.attrOp.length > 0 )
						&& ( this.attrValue && this.attrValue.length > 0 ) ) {
						let caseInsensitive = this.case || "";
						value += `[ ${this.attrName} ${this.attrOp} "${this.attrValue}" ${caseInsensitive}]`;
					}

					if( this.pseudoClass && this.pseudoClass.length > 0 )
						value += `:${this.pseudoClass}`;

					if( this.pseudoElement && this.pseudoElement.length > 0 )
						value += `::${this.pseudoElement}`;

				}
				return value.length > 0 ? value : null;
			}.bind( this.selector )
		);
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
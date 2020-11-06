import Disposable from "../Disposable.js";

export default class StyleSelector extends Disposable {
	constructor(unparsed) {
		super(unparsed);
		this.useCustom = unparsed ? unparsed.useCustom : false;
		this.custom = unparsed && unparsed.custom ? unparsed.custom : null;
		this.tag = unparsed && unparsed.tag ? unparsed.tag : "*";
		this.class = unparsed && unparsed.class ? unparsed.class : null;
		this.id = unparsed && unparsed.id ? unparsed.id : null;
		this.attrName = unparsed && unparsed.attrName ? unparsed.attrName : null;
		this.attrOp = unparsed && unparsed.attrOp ? unparsed.attrOp : null;
		this.attrValue = unparsed && unparsed.attrValue ? unparsed.attrValue : null;
		this.case = unparsed && unparsed.case ? unparsed.case : [];
		this.pseudoClass = unparsed && unparsed.pseudoClass ? unparsed.pseudoClass : null ;
		this.pseudoElement = unparsed && unparsed.pseudoElement ? unparsed.pseudoElement : null;
	}

	toString() {

		let value = "";
		if( this.useCustom && this.custom && this.custom.length > 0) {
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
	}

}
import {TypedValue} from "../Types/TypedValue.js";

export class ConditionParameter {
	constructor(unparsed = { sourceType: null, sourceValue: null}) {
		this.sourceType = unparsed ? unparsed.sourceType : null;
		if( unparsed && unparsed.sourceValue ) {
			this.sourceValue = "string" === typeof unparsed.sourceValue ? unparsed.sourceValue : new TypedValue( unparsed.sourceValue );
		}
		else {
			this.sourceValue = null;
		}
	}
}
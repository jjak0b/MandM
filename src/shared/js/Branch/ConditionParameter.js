import {TypedValue} from "../Types/TypedValue.js";

export class ConditionParameter {
	constructor(unparsed = { sourceType: null, sourceValue: null, sourcePoints: 0 }) {
		this.sourceType = unparsed ? unparsed.sourceType : null;
		this.sourcePoints = unparsed ? unparsed.sourcePoints: 0;
		if( unparsed && unparsed.sourceValue ) {
			this.sourceValue = "string" === typeof unparsed.sourceValue ? unparsed.sourceValue : new TypedValue( unparsed.sourceValue );
		}
		else {
			this.sourceValue = null;
		}
	}
}
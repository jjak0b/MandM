import {TypedValue} from "../Types/TypedValue.js";

export class ConditionParameter {
	constructor(unparsed) {
		this.sourceType = unparsed ? unparsed.sourceType : null;
		this.sourceValue = unparsed && unparsed.sourceValue ? new TypedValue( unparsed.sourceValue ): null;
	}
}
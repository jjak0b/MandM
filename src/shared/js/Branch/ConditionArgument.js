import {TypedValue} from "../Types/TypedValue.js";

export class ConditionArgument {

	constructor(unparsed) {
		this.types = unparsed && unparsed.types ? unparsed.types : [];
	}
}
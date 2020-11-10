import Disposable from "../Disposable.js";
import {TypedValue} from "../Types/TypedValue.js";

export class BranchCondition extends Disposable {
	constructor(unparsed) {
		super(unparsed);

		this.function = unparsed ? unparsed.function : null;

		this.params = unparsed && unparsed.params ? unparsed.params : [];
		for (let i = 0; i < this.params.length; i++) {
			this.params[ i ] = new TypedValue( this.params[ i ] );
		}
	}
}
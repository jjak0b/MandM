import Disposable from "../Disposable.js";
import {ConditionParameter} from "./ConditionParameter.js";

export class BranchCondition extends Disposable {
	constructor(unparsed = {
		function: "isDefined",
		params: [
			new ConditionParameter({
				sourceType: "variable",
				sourceValue: "userInput"
			})
		]
	}) {
		super(unparsed);

		this.function = unparsed ? unparsed.function : null;
		this.params = [];
		if( unparsed && unparsed.params) {
			for (let i = 0; i < unparsed.params.length; i++) {
				this.params.push(
					new ConditionParameter(unparsed.params[i])
				);
			}
		}
	}

	/**
	 *
	 * @param func {Function}
	 * @param envVariables {[]}
	 * @returns {boolean|null|undefined}
	 */
	run( func, envVariables ) {
		let params = this.params.map( (param) => {
			if( param.sourceType === "variable" ) {
				return param.sourceValue in envVariables ? envVariables[ param.sourceValue ] : undefined;
			}
			else {
				return param.sourceValue;
			}
		});

		return func.apply( undefined, params );
	}
}
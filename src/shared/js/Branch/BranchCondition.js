import Disposable from "../Disposable.js";
import {ConditionParameter} from "./ConditionParameter.js";

export class BranchCondition extends Disposable {
	constructor(unparsed = {
		function: "isDefined",
		params: [
			new ConditionParameter({
				sourceType: "variable",
				sourceValue: "score",
			})

		],
		negate: false,
		rewardPoints: 0,
		requireHumanEvaluation: false
	}) {
		super(unparsed);

		this.function = unparsed ? unparsed.function : null;
		this.params = [];
		this.negate = unparsed ? !!unparsed.negate : false;
		this.rewardPoints = unparsed ? unparsed.rewardPoints : 0;
		this.requireHumanEvaluation = unparsed ? !!unparsed.requireHumanEvaluation : false;
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
	 * @param envVariables {{}}
	 * @returns {boolean|null|undefined}
	 */
	run( func, envVariables ) {
		let params = this.params.map( (param) => {
			if( param.sourceType === "variable" ) {
				console.log( `[${this.constructor.name}]`, "is in", param.sourceValue, envVariables );
				return param.sourceValue in envVariables ? envVariables[ param.sourceValue ] : undefined;
			}
			else {
				return param.sourceValue;
			}
		});
		console.log( `[${this.constructor.name}]`, "computing", func.name, params );
		let result = func.apply( undefined, params );
		result = this.negate ? !result : !!result;
		console.log( `[${this.constructor.name}]`, "computed", result );
		return result;
	}
}
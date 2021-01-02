import Disposable from "../Disposable.js";
import {ConditionParameter} from "./ConditionParameter.js";

export class BranchCondition extends Disposable {
	constructor(unparsed = {
		function: "isDefined",
		params: [
			new ConditionParameter({
				sourceType: "variable",
				sourceValue: "userInput",
			})

		],
		rewardPoints: 0
	}) {
		super(unparsed);

		this.function = unparsed ? unparsed.function : null;
		this.params = [];
		this.rewardPoints = unparsed ? unparsed.rewardPoints : 0;
		if( unparsed && unparsed.params) {
			for (let i = 0; i < unparsed.params.length; i++) {
				this.params.push(
					new ConditionParameter(unparsed.params[i])
				);
			}
		}
	}
}
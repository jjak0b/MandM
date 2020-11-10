import ActivityData from "./ActivityData.js";
import Time from "../../Types/Time.js"
import {BranchCondition} from "../../Branch/BranchCondition.js";

export default class ActivityDataBranch extends ActivityData {

	static _functions = {
		equals: {
			arguments: [
				{
					accepts: [
						String.name,
						Number.name,
						Array.name,
						Date.name,
						Time.name
					]
				},
				{
					accepts: [
						String.name,
						Number.name,
						Array.name,
						Date.name,
						Time.name
					]
				}
			]
		},

	}

	constructor(unparsed) {
		super(unparsed);

		this.condition = new BranchCondition( unparsed ? unparsed.condition : null );
	}
}
import ActivityData from "./ActivityData.js";
import Time from "../../Types/Time.js"
import {BranchCondition} from "../../Branch/BranchCondition.js";

export default class ActivityDataBranch extends ActivityData {

	static _functions = {
		isDefined: { // presence of value
			arguments: [
				{
					name: "this",
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
		equals: { // equality
			arguments: [
				{
					name: "this",
					accepts: [
						String.name,
						Number.name,
						Date.name,
						Time.name
					]
				},
				{
					name: "that",
					accepts: [
						String.name,
						Number.name,
						Date.name,
						Time.name
					]
				}
			]
		},
		isInRange: { // check value in range
			arguments: [
				{
					name: "this",
					accepts: [
						Number.name,
						Date.name,
						Time.name
					]
				},
				{
					name: "min",
					accepts: [
						Number.name,
						Date.name,
						Time.name
					]
				},
				{
					name: "max",
					accepts: [
						Number.name,
						Date.name,
						Time.name
					]
				}
			]
		},
		isAny: { // check value is in a set of values
			arguments: [
				{
					name: "this",
					accepts: [
						String.name,
						Number.name,
						Array.name,
						Date.name,
						Time.name
					]
				},
				{
					name: "elements",
					accepts: [
						Array.name,
					]
				}
			]
		}
	}

	static _variables = [
		"userInput"
	]

	constructor(unparsed) {
		super(unparsed);

		this.condition = new BranchCondition( unparsed ? unparsed.condition : null );
	}
}
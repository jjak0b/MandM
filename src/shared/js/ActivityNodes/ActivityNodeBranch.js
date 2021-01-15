import ActivityNode from "./ActivityNode.js";
import ActivityDataBranch from "./ActivityDataTypes/ActivityDataBranch.js";
import NodeParser from "../NodeParser.js";
import NodeUtils from "../NodeUtils.js";

export default class ActivityNodeBranch extends ActivityNode {
	constructor(unparsed) {
		super(unparsed);
		if( unparsed ) {
			if( unparsed.data && !(unparsed.data instanceof ActivityDataBranch) ) {
				this.data = new ActivityDataBranch( this.data );
			}
		}

	}

	duplicate(locales, missionCategory) {
		let duplicate = super.duplicate(locales, missionCategory );
		return Object.setPrototypeOf(duplicate, ActivityNodeBranch.prototype );
	}
}
NodeParser.register( NodeUtils.Types.Branch, ActivityNodeBranch );
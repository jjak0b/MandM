import ActivityNode from "./ActivityNode.js";
import NodeParser from "../NodeParser.js";
import NodeUtils from "../NodeUtils.js";
import ActivityDataSceneable from "./ActivityDataTypes/ActivityDataSceneable.js";

export default class ActivityNodeTell extends ActivityNode {
	constructor(unparsed) {
		super(unparsed);
		this.data = new ActivityDataSceneable(this.data);
	}

	duplicate(locales, missionCategory) {
		let duplicate = super.duplicate(locales, missionCategory );
		return Object.setPrototypeOf(duplicate, ActivityNodeTell.prototype );
	}
}
NodeParser.register( NodeUtils.Types.Tell, ActivityNodeTell );
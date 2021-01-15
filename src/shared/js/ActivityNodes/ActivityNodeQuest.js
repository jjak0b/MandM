import ActivityNode from "./ActivityNode.js";
import NodeParser from "../NodeParser.js";
import NodeUtils from "../NodeUtils.js";
import ActivityDataSceneable from "./ActivityDataTypes/ActivityDataSceneable.js";
import ActivityData from "./ActivityDataTypes/ActivityData.js";

export default class ActivityNodeQuest extends ActivityNode {
	constructor(unparsed) {
		super(unparsed);
		if( unparsed ) {
			if( unparsed.data && !(unparsed.data instanceof ActivityData) ) {
				this.data = new ActivityDataSceneable(this.data);
			}
		}
	}

	duplicate(locales, missionCategory) {
		let duplicate = super.duplicate(locales, missionCategory );
		return Object.setPrototypeOf(duplicate, ActivityNodeQuest.prototype );
	}
}
NodeParser.register( NodeUtils.Types.Quest, ActivityNodeQuest );
import ActivityNode from "./ActivityNode.js";
import ActivityDataBranch from "./ActivityDataTypes/ActivityDataBranch.js";
import NodeParser from "../NodeParser.js";
import NodeUtils from "../NodeUtils.js";

export default class ActivityNodeBranch extends ActivityNode {
	constructor(unparsed) {
		super(unparsed);

		this.data = new ActivityDataBranch( this.data );
	}
}
NodeParser.register( NodeUtils.Types.Branch, ActivityNodeBranch );
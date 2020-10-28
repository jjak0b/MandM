import I18nCategorized from "./I18nCategorized.js";
import ActivityNode from "./ActivityNodes/ActivityNode.js";

export default class Mission extends I18nCategorized {
	constructor( unparsedMission ) {
		super( unparsedMission );
		this.title = unparsedMission.title;
		this.description = unparsedMission.description;
		this.tree = new ActivityNode( unparsedMission.tree );
	}

	dispose(params) {
		this.tree.dispose(params);
		super.dispose(params);
	}
}
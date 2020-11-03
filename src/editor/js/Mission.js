import I18nCategorized from "./I18nCategorized.js";
import ActivityNode from "./ActivityNodes/ActivityNode.js";
import NodeParser from "./NodeParser.js";
import NodeUtils from "./NodeUtils.js";

NodeParser.register( NodeUtils.Types.Root, ActivityNode );

export default class Mission extends I18nCategorized {
	constructor( unparsedMission ) {
		super( unparsedMission );

		this.title = unparsedMission ? unparsedMission.title : null;
		this.description = unparsedMission ? unparsedMission.description : null;
		this.tree = unparsedMission && unparsedMission.tree ? new ActivityNode( unparsedMission.tree ) : null;
	}

	dispose(params) {
		if( this.tree )
			this.tree.dispose(params);
		super.dispose(params);
	}
}
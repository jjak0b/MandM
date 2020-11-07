const nodeTypes = {
	Mission: "mission",
	Tell : "tell",
	Quest : "quest",
	Branch : "branch",
	Root : "#"
}
export default class NodeUtils {
	static getRoleDescriptionLabelByType( type ) {
		switch ( type ) {
			case NodeUtils.Types.Mission:
				return "shared.label-mission";
				break;
			case NodeUtils.Types.Branch:
				return "ActivityEditorWidget.treeNode-type.branch.label";
				break;
			case NodeUtils.Types.Quest:
				return "ActivityEditorWidget.treeNode-type.quest.label";
				break;
			case NodeUtils.Types.Tell:
				return "ActivityEditorWidget.treeNode-type.tell.label";
				break;
			default:
				return "?"
				break;

		}
	}

	static getTypeForChild( parentType ){
		switch( parentType ){

			// get leaf
			case NodeUtils.Types.Mission:
			case NodeUtils.Types.Branch:
			case NodeUtils.Types.Tell:
			case NodeUtils.Types.ActivityGeneric:
				return NodeUtils.Types.ActivityGeneric;

				break;
			// get a root as leaf
			case NodeUtils.Types.Quest:

				return NodeUtils.Types.Branch;

				break;
		}
	}
}

NodeUtils.Types = nodeTypes;
import I18nCategorized from "./I18nCategorized.js";
import ActivityNode from "./ActivityNodes/ActivityNode.js";
import NodeParser from "./NodeParser.js";
import NodeUtils from "./NodeUtils.js";
import JSTreeNode from "./JSTreeNode.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";

NodeParser.register( NodeUtils.Types.Mission, ActivityNode );

export default class Mission extends I18nCategorized {

	static duplicateCallback = null;

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

	static setDuplicateCallback( func ) {
		this.duplicateCallback = func;
	}

	duplicate( locales ) {
		let duplicateMission = new Mission(JSON.parse(JSON.stringify(this)));
		let id = I18nUtils.getUniqueID();
		let prefix = `assets.mission.${ id }`;
		duplicateMission.i18nCategory = prefix;
		duplicateMission.id = id
		duplicateMission.title = prefix + ".title";
		duplicateMission.description =  prefix + ".description";

		Mission.duplicateCallback(locales, duplicateMission.title, this.title);
		Mission.duplicateCallback(locales, duplicateMission.description, this.description);

		if (duplicateMission.tree) {
			duplicateMission.tree = this.tree.duplicate(locales, duplicateMission.i18nCategory);
		}

		return duplicateMission;
	}
}
import I18nCategorized from "./I18nCategorized.js";
import ActivityNode from "./ActivityNodes/ActivityNode.js";
import NodeParser from "./NodeParser.js";
import NodeUtils from "./NodeUtils.js";

NodeParser.register( NodeUtils.Types.Mission, ActivityNode );

export default class Mission extends I18nCategorized {

	constructor( unparsedMission ) {
		super( unparsedMission );

		this.title = unparsedMission ? unparsedMission.title : null;
		this.description = unparsedMission ? unparsedMission.description : null;
		this.tree = unparsedMission && unparsedMission.tree ? new ActivityNode( unparsedMission.tree ) : null;
		this.active = unparsedMission && unparsedMission.active ? unparsedMission.active : true;
	}

	dispose(params) {
		if( this.tree )
			this.tree.dispose(params);
		super.dispose(params);
	}

	static setDuplicateCallback( func ) {
		this.duplicateCallback = func;
	}

	duplicate( locales, i18nCategory ) {
		let duplicateMission = super.duplicate( i18nCategory + ".mission");

		duplicateMission.title = duplicateMission.i18nCategory + ".title";
		duplicateMission.description =  duplicateMission.i18nCategory + ".description";
		duplicateMission.active = this.active;
		locales.push(
			[
				this.title,
				duplicateMission.title
			],
			[
				this.description,
				duplicateMission.description
			]
		);

		if ( this.tree ) {
			duplicateMission.tree = this.tree.duplicate(locales, duplicateMission.i18nCategory);
			duplicateMission.tree.id = duplicateMission.id;
		}

		return Object.setPrototypeOf( duplicateMission, Mission.prototype );
	}
}
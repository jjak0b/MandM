import JSTreeNode from "../JSTreeNode.js";
import NodeParser from "../NodeParser.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";

export default class ActivityNode extends JSTreeNode{

	constructor(unparsedNode) {
		super(unparsedNode);
		if( unparsedNode && typeof unparsedNode == "object" && !(unparsedNode instanceof ActivityNode ) ){
			for (let i = 0; i < this.children.length; i++) {
				let child = this.children[i];
				if( child && typeof child == "object" && !(child instanceof ActivityNode ) ){
					this.children[ i ] = NodeParser.parse( child );
				}
			}
		}
	}

	dispose( params ) {
		if( this.data ) {
			if( this.data.dispose ) {
				this.data.dispose( params );
			}
		}
		if (this.children) {
			for (let i = 0; i < this.children.length; i++) {
				if (this.children[i].dispose)
					this.children[i].dispose(params);
			}
		}
		super.dispose( params );
	}

	duplicate( locales, missionCategory ) {
		let duplicateActivity = new ActivityNode(JSON.parse(JSON.stringify(this)));
		let activityId = I18nUtils.getUniqueID();
		duplicateActivity.id = activityId;
		let activityCategory = missionCategory + '.activity.' + activityId;

		if( this.data ) {
			if( this.data.duplicate ) {
				duplicateActivity.data = this.data.duplicate(locales, activityCategory);
			}
		}

		if (this.children) {
			for (let i = 0; i < this.children.length; i++) {
				if (this.children[i].duplicate)
						duplicateActivity.children[i] = new ActivityNode(this.children[i].duplicate(locales, missionCategory));
			}
		}

		return duplicateActivity;
	}
}
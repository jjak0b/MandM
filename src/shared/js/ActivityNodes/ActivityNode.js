import JSTreeNode from "../JSTreeNode.js";
import NodeParser from "../NodeParser.js";
import {I18nUtils} from "../I18nUtils.js";

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
		let activityCategory = missionCategory + '.activity';

		let duplicateActivity = JSON.parse(JSON.stringify( this ));
		delete duplicateActivity.data;
		delete duplicateActivity.children;
		duplicateActivity = new JSTreeNode( duplicateActivity );

		if( this.data ) {
			if( this.data.duplicate ) {
				duplicateActivity.data = this.data.duplicate(locales, activityCategory);
				duplicateActivity.id = duplicateActivity.data.id;
			}
		}

		if (this.children) {
			duplicateActivity.children = new Array( this.children.length );
			for (let i = 0; i < this.children.length; i++) {
				duplicateActivity.children[i] = this.children[i].duplicate(locales, missionCategory);
			}
		}

		return Object.setPrototypeOf( duplicateActivity, ActivityNode.prototype );
	}
}
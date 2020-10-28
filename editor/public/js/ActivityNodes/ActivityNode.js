import JSTreeNode from "../JSTreeNode.js";
import NodeParser from "../NodeParser.js";

export default class ActivityNode extends JSTreeNode{

	constructor(unparsedNode) {
		super(unparsedNode);
		if( !(unparsedNode instanceof ActivityNode ) ){
			for (let i = 0; i < this.children.length; i++) {
				this.children[ i ] = NodeParser.parse( this.children[ i ] );
			}
		}
	}

	dispose( params ) {
		if( this.data ) {
			if( this.data.dispose ) {
				this.data.dispose( params );
			}
		}
		super.dispose( params );
	}
}
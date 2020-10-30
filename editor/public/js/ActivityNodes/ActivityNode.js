import JSTreeNode from "../JSTreeNode.js";
import NodeParser from "../NodeParser.js";

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
		console.log( this, this.children );
		for (let i = 0; i < this.children.length; i++) {
			if( this.children[ i ].dispose )
				this.children[ i ].dispose( params );
		}
		super.dispose( params );
	}
}
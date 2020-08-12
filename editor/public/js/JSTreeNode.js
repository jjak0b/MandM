import {i18n, i18nContent, I18nString} from "../components/Translations.js";
import NodeUtils from "./NodeUtils.js";

/* jsTree Node Object structure */
export default class JSTreeNode {

	static DEFAULT = {
		id: "-1"
	}
	/**
	 *
	 * @param id Id of the node, set undefined, if you want to set it automatically
	 * @param type type of the node into Jstree
	 * @param data custom data
	 * @param children array of children nodes
	 */
	constructor( id = "-1", type, data, children ) {
		this.id = "" + id;
		this.type = type;
		this.data = data;
		this.text = new I18nString( i18nContent, data.title );
		let roleLabelDescription = NodeUtils.getRoleDescriptionLabelByType( type );
		this.a_attr = {
			"aria-roledescription": new I18nString( i18n, roleLabelDescription )
		}
		this.children = [];
		if( children ){
			for( let i = 0; i < children.length; i++ ) {
				let c = children[i];
				this.children[ i ] = new JSTreeNode(
					c.id,
					c.type,
					c.data,
					c.children
				);
			}
		}
	}

	/**
	 * Parse a JSON Object (from jsTree) to JSTreeNode class instance
	 * @param jsonNode
	 * @returns {JSTreeNode}
	 */
	static parse( jsonNode ) {
		return new JSTreeNode( jsonNode.id, jsonNode.type, jsonNode.data, jsonNode.children );
	}

}
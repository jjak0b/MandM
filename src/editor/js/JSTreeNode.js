import {i18n} from "../components/Translations.js";
// let i18n = {};
import { I18nString } from "../../shared/js/I18nUtils.js";
import NodeUtils from "./NodeUtils.js";
import Disposable from "./Disposable.js";

/* jsTree Node Object structure */
export default class JSTreeNode extends Disposable{

	static DEFAULT = {
		id: "-1"
	}
	/**
	 *
	 * @param id Id of the node, set undefined, if you want to set it automatically
	 * @param tagName custom tag name for the node used to identify it visually into the three
	 * @param type type of the node into Jstree
	 * @param data custom data
	 * @param children array of children nodes (will be parsed to be a JSTreeNode's Object )
	 */
	constructor(
		/*Number|String*/		unparsedNodeORid = JSTreeNode.DEFAULT.id,
		/*String|I18nString*/ 	tagName,
		/*NodeUtils.Types*/ 	type,
		/*Object*/ 				data,
		/*Array*/				children,
	) {
		super( unparsedNodeORid );
		let id = unparsedNodeORid;
		let unparsed = unparsedNodeORid;
		if( "object" === typeof unparsedNodeORid ) {
			id = "" + unparsed.id;
			tagName = unparsed.text;
			type = unparsed.type;
			data = unparsed.data;
			children = unparsed.children || [];
		}

		this.id = "" + id;
		this.text = tagName;
		this.type = type;
		this.data = data;
		let roleLabelDescription = NodeUtils.getRoleDescriptionLabelByType( type );
		this.li_attr = {
			"aria-haspopup": true,
			"aria-grabbed": false
		}
		this.a_attr = {
			"aria-roledescription": new I18nString( i18n, roleLabelDescription, { method: 'tc' } )
		}
		this.children = children;

	}

	/**
	 * Parse a JSON Object (from jsTree) to JSTreeNode class instance
	 * @param jsonNode
	 * @returns {JSTreeNode}
	 */
	static parse( jsonNode ) {
		return new JSTreeNode( jsonNode.id, jsonNode.text, jsonNode.type, jsonNode.data, jsonNode.children );
	}

}
import {template} from "./ActivityTreeWidgetTemplate.js";
import {i18n, i18nContent, I18nString } from "./Translations.js";
import JSTreeNode from "../js/JSTreeNode.js";
import NodeUtils from "../js/NodeUtils.js";

export const component = {
	i18n: i18nContent,
	template: template,
	props: {
		value: Object,
		locale : String
	},
	data() {
		return {
			tree: null,
		}
	},
	watch: {
		'locale' : function( newVal) {
			if( this.tree )
				this.redraw();
		},
		"value.text" : function ( newVal ) {
			this.tree.rename_node(this.value, newVal);
		}
	},
	updated(){
		this.redraw();
	},
	methods: {
		notifyValue(){
			console.info( "[ActivityTree]", "updating current node", this.value );
			this.$emit( 'input', this.value );
		},
		get_json( id = "#") {
			let jsonNode = this.tree.get_json( id, {
				no_state: true,
				no_li_attr: true,
				no_a_attr: true,
				flat: false
			});
			jsonNode = id == "#" ? jsonNode[0] : jsonNode;
			let jsTreeNode = JSTreeNode.parse( jsonNode );
			return jsTreeNode;
		},
		redraw(){
			/*
				a jstree error happens if not delayed by 1 tick,
				probably si caused by performing blur, focus, ... events and redrawing at same tick
			 */
			this.$nextTick( function() {
				this.tree.redraw( true );
			});
		},
		load( jsonData ) {
			let self = this;
			let e = this.$refs.treeView;
			if( !e ) console.error( "[ActivityEditor]", "No TreeView found" );

			console.info("[ActivityTree]", "loading new", "activity tree", jsonData );

			if( jsonData )
				jsonData[ 'state'] = { opened: true, selected: true };

			let data = [];
			if( jsonData )
				data = [ jsonData ];

			if( this.tree ) {
				this.tree.destroy( false );
				this.tree = null;
			}

			this.value = null;
			this.notifyValue();
			if( !jsonData ){
				return;
			}
			// open root

			$( e ).jstree({
				"core": {
					// so that create works
					"check_callback": true,
					"multiple": false, // no multiselection
					data: data
				},
				"plugins": [
					"types"
				],
				"types":{
					[NodeUtils.Types.Root]: {
						"valid_children": [
							NodeUtils.Types.Quest,
							NodeUtils.Types.Tell
						],
						"icon": "glyphicon glyphicon-briefcase"
					},
					[NodeUtils.Types.Quest]: {
						"valid_children": [
							NodeUtils.Types.Branch
						],
						"icon": "glyphicon glyphicon-play"
					},
					[NodeUtils.Types.Branch]: {
						"valid_children": [
							NodeUtils.Types.Quest,
							NodeUtils.Types.Tell
						],
						"icon": "glyphicon glyphicon-question-sign"
					},
					[NodeUtils.Types.Tell]: {
						"valid_children": [],
						"icon": "glyphicon glyphicon-book"
					},
					"default": {
						"valid_children": [],
						"icon": "glyphicon glyphicon-remove-circle"
					}
				}
			});
			this.tree = $( e ).jstree(true);
			$( e ).on( "select_node.jstree", this.onSelect );
			$( e ).on( "create_node.jstree", this.onCreate );
		},
		// events
		onCreate( event, data ) {
			let node = data.node;
		},
		onSelect( event, data ) {
			let node = data.instance.get_node(data.selected[0]);
			this.value = node;
			this.notifyValue();
		},
		// Operations
		add( id, type, nodeName, nodeData ) {
			if (!nodeData )
				return null;
			let node = null;
			let selectedNode = this.tree.get_selected(true)[0]

			id = this.createNewNode( id, type, nodeName, nodeData, selectedNode );

			if( id ) {
				if (selectedNode)
					this.tree.deselect_node(selectedNode.id);
				this.tree.select_node(id);
				node = this.tree.get_node(id);
			}
			return node;
		},
		remove() {
			let selectedNode = this.tree.get_selected(true)[0];
			let nextSelectNode = this.tree.get_prev_dom( selectedNode );

			this._remove( selectedNode );
			this.tree.select_node( nextSelectNode );
		},
		_remove( node ) {
			if( node.children ) {
				for (let i = 0; i < node.children; i++) {
					let child = this.tree.get_node( node.children[i] );
					this._remove( child );
				}
			}
			i18nContent.removeMessageAll( node.data.title );
			i18nContent.removeMessageAll( node.data.description );
			this.tree.delete_node( node );
		},
		createNewNode( id, newType, nodeName, nodeData, selectedNode ) {
			// this.$i18n.t( 'shared.label-new-element', { 'name': this.$i18n.tc( NodeUtils.getRoleDescriptionLabelByType( item.type ) ) } )
			let selectedtype = this.tree.get_type( selectedNode );
			let item = null;
			let nodeId = null;

			let parentNode = null;
			let position = 0;
			// Adding behavior: How the we should add the item to tree
			switch( selectedtype ) {

				// roots
				case NodeUtils.Types.Root:
				case NodeUtils.Types.Branch:
				case NodeUtils.Types.Quest:

					parentNode = selectedNode;
					position = "last";

					break;
				// leafs
				case NodeUtils.Types.Tell:

					parentNode = this.tree.get_node( this.tree.get_parent( selectedNode ) );
					position = parentNode.children.indexOf( selectedNode.id );

					break;
			}
			item = new JSTreeNode(
				id,
				nodeName,
				newType,
				nodeData,
				[]
			);
			console.log( "creating new Node:", "parent:", parentNode, "item:", item, "pos:", position );
			nodeId = this.tree.create_node( parentNode, item, position );

			console.log("created node with id", nodeId);
			return nodeId;
		}
	}
};

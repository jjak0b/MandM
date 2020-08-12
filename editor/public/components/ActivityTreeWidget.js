import {template} from "./ActivityTreeWidgetTemplate.js";
import {i18n, i18nContent, I18nString } from "./Translations.js";
import JSTreeNode from "../js/JSTreeNode.js";
import NodeUtils from "../js/NodeUtils.js";

export const component = {
	i18n: i18nContent,
	template: template,
	props: {
		target: Object,
		locale : String
	},
	data() {
		return {
			value : null,
			tree: null,
		}
	},
	watch: {
		'locale' : function( newVal) {
			if( this.tree )
				this.redraw();
		}
	},
	updated(){
		this.redraw();
	},
	methods: {
		notifyValue() {
			let jsonNode = this.tree.get_json( '#', {
				no_state: true,
				no_li_attr: true,
				no_a_attr: true,
				flat: false
			})[0];
			this.$emit( 'input', JSTreeNode.parse( jsonNode ) );
			this.redraw();
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
			// open root

			$( e ).jstree({
				"core": {
					// so that create works
					"check_callback": true,
					"multiple": false, // no multiselection
					data: data
				},
				"plugins": [
					"unique",
					"types"
				],
				"types":{
					"#": {
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
		onCreate( event, data ) {
			let node = data.node;
		},
		onSelect( event, data ) {
			let node = data.instance.get_node(data.selected[0]);
			// let item = node.data;
			let jsonNode = this.tree.get_json(
				node,
				{
					no_state: true,
					no_li_attr: true,
					no_a_attr: true,
					flat: false
				}
			);
			this.$emit( "select", JSTreeNode.parse( jsonNode ) );
		},
		add( id, type, nodeData ) {
			if (!nodeData )
				return;

			let selectedNode = this.tree.get_selected(true)[0]

			id = this.createNewNode( id, type, nodeData, selectedNode );

			if( selectedNode )
				this.tree.deselect_node( selectedNode.id );
			this.tree.select_node( id );
			/*
				Wait next tick and so the parent gets the data.title and set it on the form's input
				then the i18n content is updated but the selected item's text is not
				then redraw the tree to update the texts
			*/
			this.notifyValue();
			let node = this.tree.get_node( id );
			return JSTreeNode.parse( node );
		},
		remove() {
			let selectedNode = this.tree.get_selected(true)[0];
			let nextSelectNode = this.tree.get_prev_dom( selectedNode );

			this._remove( selectedNode );

			this.tree.select_node( nextSelectNode );
			this.notifyValue();
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
		createNewNode( id, newType, nodeData, selectedNode ) {
			// this.$i18n.t( 'shared.label-new-element', { 'name': this.$i18n.tc( NodeUtils.getRoleDescriptionLabelByType( item.type ) ) } )
			let selectedtype = this.tree.get_type( selectedNode );
			let item = null;
			let nodeId = null;

			let parentNode = null;
			let position = 0;
			// Adding behavior: How the we should add the item to tree
			switch( selectedtype ) {

				// roots
				case "#":
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

import {template} from "./ActivityTreeWidgetTemplate.js";
import {component as activityToolbar} from "./ActivityToolbarWidget.js";
import NodeUtils from "../../../shared/js/NodeUtils.js";
import NodeParser from "../../../shared/js/NodeParser.js";

export const component = {
	template: template,
	props: {
		value: Object,
		locale: String
	},
	components: {
		'toolbar': activityToolbar
	},
	data() {
		return {
			tree: null,
			grabNode: null,
			selectedNode: null
		}
	},
	watch: {
		'locale' : function( newVal) {
			if( this.tree )
				this.redraw();
		},
		"value.text" : function ( newVal ) {
			if( this.tree ) this.tree.rename_node(this.value, newVal);
		}
	},
	computed: {
		currentType: function() { return ( this.selectedNode ? this.selectedNode.type : null ) }
	},
	updated(){
		this.redraw();
	},
	methods: {
		notifyValue( node ){
			let parsed = NodeParser.parse( node );
			console.info( "[ActivityTree]", "updating current node", node, "aka -> parsed", parsed);
			this.$emit( 'input', parsed );
		},
		get_json( id = "#") {
			let jsonNode = this.tree.get_json( id );
			jsonNode = id == "#" ? jsonNode[0] : jsonNode;

			return NodeParser.parse( jsonNode );
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

			if( !jsonData ){
				this.notifyValue( null );
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
					"types",
					"dnd"
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

			// select root node
			let nodeToSelect = this.tree.get_node( jsonData.id );
			this.tree.select_node( nodeToSelect );
			// since "select_node.jstree" seems to be trigghered only by user select, we will notify to parent manually
			this.notifyValue( nodeToSelect );
		},
		// events
		onCreate( event, data ) {
			let node = data.node;
		},
		onSelect( event, data ) {
			this.selectedNode = data.instance.get_node(data.selected[0]);
			this.notifyValue( this.selectedNode );
		},
		// Operations
		add( activityNode ) {
			let node = null;
			let selectedNode = this.tree.get_selected(true)[0];

			let id = this.createNewNode( activityNode, selectedNode );

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
			this.tree.select_node( nextSelectNode );
			this.tree.delete_node( selectedNode );
		},
		createNewNode( item, selectedNode ) {
			let selectedtype = this.tree.get_type( selectedNode );
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
			console.log( "creating new Node:", "parent:", parentNode, "item:", item, "pos:", position );
			nodeId = this.tree.create_node( parentNode, item, position );

			console.log("created node with id", nodeId);
			return nodeId;
		},
		grab() {
			this.grabNode = this.tree.get_selected(true)[0];
			this.grabNode.li_attr["aria-grabbed"] = true;
			this.redraw();
		},
		drop() {
			if(this.grabNode) {
				let selectedNode = this.tree.get_selected(true)[0];
				let parentNode = this.tree.get_node(this.tree.get_parent(selectedNode));
				let position = $.inArray(selectedNode.id, parentNode.children);
				let type = this.tree.get_type(selectedNode);
				let moved = false;
				if (type !== '#') {
					//viene spostato nella posizione del nodo selezionato se possibile
					moved = this.tree.move_node(this.grabNode, parentNode, position);
				}
				if (!moved) {
					//altrimenti viene spostato all'interno del nodo selezionato
					moved = this.tree.move_node(this.grabNode, selectedNode);
				}
				if (moved) {
					this.tree.deselect_node(selectedNode);
					this.tree.select_node(this.grabNode);
				}
				this.grabNode.li_attr["aria-grabbed"] = false;
				this.redraw();
				this.grabNode = null;
			}
		},
		contextMenuHandler(e) {
			const menu = $('#menu');
			const treeView = $('#treeView');

			e.preventDefault();
			let x = e.clientX;
			let y = e.clientY;
			var ev = new MouseEvent("click", {clientX: x, clientY: y, bubbles: true});
			var el = document.elementFromPoint(x, y);
			el.dispatchEvent(ev);

			menu.css({
				position: 'fixed',
				display: 'block',
				zIndex: 1,
				top: e.clientY,
				left: e.clientX
			});
			menu.focus();

			$(document).click(function () {
				menu.css({display: 'none'});
			});
			$(document).on("keydown", function (event) {
				if (event.which === 13 || event.which === 27) {
					menu.css({display: 'none'});
				}
			});
		}
	},
	mounted() {
		$("#treeView").on("select_node.jstree", () => {
			this.$emit("selectedNode");
		});
	}
};
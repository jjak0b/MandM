import {template} from "./ActivityTreeWidgetTemplate.js";
import {i18n, i18nContent, I18nString } from "./Translations.js";

export const component = {
	i18n: i18nContent,
	template: template,
	props: {
		value : Object,
		target: Object,
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
		"target.type": function( newVal ) {
			let selectedNode = this.tree.get_selected(true)[0];
			if( selectedNode ){
				selectedNode.a_attr[ "aria-roledescription" ].label = getRoleDescriptionLabelByType( newVal );
				this.tree.set_type( selectedNode, newVal );
				this.redraw();
			}

		}
	},
	updated(){
		this.redraw();
	},
	mounted() {
		this.$nextTick( function() {
			console.info("[ActivityEditor]", "loading new", "action", this.value )
 			this.load( this.value );
		});
	},
	methods: {
		setValue( value ){
			this.$emit( 'input', value );
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
		load( tree ) {
			let self = this;
			let e = this.$refs.treeView;
			if( !e ) console.error( "[ActivityEditor]", "No TreeView found" );
			let jsonData = TreeFromDataToJSON( tree );
			// open root
			jsonData[ 'state'] = { opened: true, selected: true };

			$( e ).jstree({
				"core": {
					// so that create works
					"check_callback": true,
					"multiple": false, // no multiselection
					data: [
						jsonData
					]
				},
				"plugins": [
					"unique",
					"types"
				],
				"types":{
					"#": {
						"valid_children": [
							"condition",
							"tell"
						],
						"icon": "glyphicon glyphicon-briefcase"
					},
					"condition": {
						"valid_children": [
							"condition",
							"tell"
						],
						"icon": "glyphicon glyphicon-info-sign"
					},
					"tell": {
						"valid_children": [],
						"icon": "glyphicon glyphicon-book"
					},
					"default": {
						"valid_children": [],
						"icon": "glyphicon glyphicon-question-sign"
					}
				}
			});
			this.tree = $( e ).jstree(true);
			$( e ).on( "select_node.jstree", this.onSelect );
		},
		onSelect( event, data ) {
			let node = data.instance.get_node(data.selected[0]);
			let item = node.data;
			this.$emit( "select", item );
		},
		add( item ) {
			if (!item ) return;
			let jsonNode = TreeFromDataToJSON( item );
			let parentNode = null;
			let position = null;
			let selectedNode = this.tree.get_selected(true)[0];

			let id = null;
			let node = null;

			if( selectedNode ){
				let type = this.tree.get_type( selectedNode );

				switch( type ){
					case "#":
					case "condition" :
						parentNode = selectedNode;
						id = this.tree.create_node( parentNode, jsonNode, 'last' );
						break;
					default:
						let parentId = this.tree.get_parent( selectedNode );
						parentNode = this.tree.get_node( parentId );
						position = parentNode.children.indexOf( selectedNode.id );
						id = this.tree.create_node( parentNode, jsonNode, position );
						break;
				}
			}
			this.tree.deselect_node( selectedNode.id );
			this.tree.select_node( id );
			/*
				Wait next tick and so the parent gets the data.title and set it on the form's input
				then the i18n content is updated but the selected item's text is not
				then redraw the tree to update the texts
			*/
			this.redraw();

		},
		remove() {
			let selectedNode = this.tree.get_selected(true)[0];
			let nextSelectNode = this.tree.get_prev_dom( selectedNode );
			i18nContent.removeMessageAll( selectedNode.data.title );
			i18nContent.removeMessageAll( selectedNode.data.description );
			this.tree.delete_node( selectedNode );
			this.tree.select_node( nextSelectNode  );


		}
	}
};


function getRoleDescriptionLabelByType( type ){
	return type != "#" ? "ActivityEditorWidget.activity-type." + type + ".label" : "shared.label-mission";
}
function TreeFromDataToJSON( root ){
	if( !root ){
		return null;
	}
	else {
		let roleLabelDescription = getRoleDescriptionLabelByType( root.type );
		let obj = {
			// id: "a_" + ( root.id != undefined ? root.id : -1 ),
			text: new I18nString( i18nContent, root.title ),
			type: root.type,
			data: root,
			a_attr: {
				"aria-roledescription": new I18nString( i18n, roleLabelDescription )
			}
		};

		if( root.children ) {
			obj[ 'children' ] = [];
			for (let i = 0; i < root.children.length; i++ ) {
				obj.children.push( TreeFromDataToJSON(root.children[i]) );
			}
		}
		return obj;
	}
}
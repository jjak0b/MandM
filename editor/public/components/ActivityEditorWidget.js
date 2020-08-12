import {template} from "./ActivityEditorWidgetTemplate.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import JSTreeNode from "../js/JSTreeNode.js";
import NodeUtils from "../js/NodeUtils.js";

export const component = {
	template: template,
	props: {
		value: Object, // current activity
		locale: String,
		mission : Object
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'activity-tree-widget': activityTreeWidgetComponent
	},
	data() {
		return {
			nextId: 0,
			activityId: null,
			refresh: false,
			nodeTypes: {
				[NodeUtils.Types.Tell]: "ActivityEditorWidget.treeNode-type.tell",
				[NodeUtils.Types.Quest]: "ActivityEditorWidget.treeNode-type.quest",
				[NodeUtils.Types.Branch]: "ActivityEditorWidget.treeNode-type.branch",
			},
			NodeUtils: NodeUtils,
			typeToAdd: null
		}
	},
	watch: {
		'mission' : function( mission ) {
			if( mission ) {
				if( !('tree' in mission) ){
					mission['tree'] = new JSTreeNode( undefined, "#", { title: mission.title}, [] );
				}
				console.info( "[ActivityEditor]", "changed mission tree", mission['tree'] );
				this.$nextTick( function () {
					this.loadTree( mission.tree ); // load tree into Tree component
					this.load( mission.tree ); // set current activity
				})
			}
			else{
				this.load( null );
			}
		}
	},
	computed: {
		localeTitle: 		function () {  return this.value && this.value.id ? 'activity.title.' + this.value.id : null },
		localeDescription: 	function () {  return this.value && this.value.id ? 'activity.description.' + this.value.id : null }
	},
	methods: {
		shouldShowTypeInSelector( type ){
			if( !this.value || !type ){
				return false;
			}

			switch( type ){
				case NodeUtils.Types.Tell:
				case NodeUtils.Types.Quest:
					return [ "#", NodeUtils.Types.Branch, NodeUtils.Types.Tell].includes( this.value.type );
					break;
				case NodeUtils.Types.Branch:
					return NodeUtils.Types.Quest == this.value.type;
					break;
			}

			return true;
		},
		setValue(value ) {
			this.activityId = value ? value.id : null;
			// this.value = value;
			this.$emit( 'input', value );
		},
		updateTree( value ) {
			Vue.set( this.mission, "tree", value );
		},
		load( activity ) {
			console.info( "[ActivityEditor]", "Loading current activity", activity );
			this.setValue( activity );
		},
		duplicate(self = this.value ) {
			let id = this.nextId++;
			let activity = {
				id: id,
				title: self.localeTitle+id,
				description: self.localeDescription+id,
				parent: self.parent,
				children: self.children
			}
		},
		isActivity() {
			if( this.value && (this.value.type == NodeUtils.Types.Quest || this.value.type == NodeUtils.Types.Tell) ) {
				return true;
			}
			return false;
		},
		loadTree( tree ) {
			this.$refs.treeView.load( tree );
		},
		onAdd(){
			let id = this.nextId++;
			let data = {
				title: 'activity.title.'+id,
				description: 'activity.description.'+id
			}
			// this.setValue( item );
			// item['id'] = this.$refs.treeView.Add( item, parent );

			let item = this.$refs.treeView.add( id, this.typeToAdd, data );
			this.typeToAdd = null;
		},
		onRemove(){
			this.$refs.treeView.remove();
		},
		onDuplicate(){
			this.$refs.treeView.duplicate();
		}
	}
};
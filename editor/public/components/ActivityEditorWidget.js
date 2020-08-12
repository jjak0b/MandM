import {template} from "./ActivityEditorWidgetTemplate.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as conditionActivityOptionWidget} from "./BranchEditorWidget.js";
import JSTreeNode from "../js/JSTreeNode.js";
import NodeUtils from "../js/NodeUtils.js";
import {i18nContent, I18nString} from "./Translations.js";
import {component as activityTaleEditorComponent} from "./ActivityTaleEditorWidget.js";
import {component as activityQuestEditorComponent} from "./ActivityQuestEditorWidget.js";
import { component as sceneEditorComponent } from "./SceneEditorWidget.js ";

function createEmptyData(){
	return {
		noteInfo: {
			name: null,
			description: null
		},
		title: null,
		description: null
	}
}
export const component = {
	template: template,
	props: {
		nextAssetId: Number,
		nextId: Number,
		locale: String,
		mission : Object
	},
	components: {
		'scene-editor-widget' :sceneEditorComponent,
		'activity-tale-editor-widget': activityTaleEditorComponent,
		'activity-quest-editor-widget': activityQuestEditorComponent,
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'branch-editor-widget': conditionActivityOptionWidget,
		'activity-tree-widget': activityTreeWidgetComponent
	},
	data() {
		return {
			shouldShowTree: false,
			activityId: null,
			refresh: false,
			nodeTypes: {
				[NodeUtils.Types.Tell]: "ActivityEditorWidget.treeNode-type.tell",
				[NodeUtils.Types.Quest]: "ActivityEditorWidget.treeNode-type.quest",
				[NodeUtils.Types.Branch]: "ActivityEditorWidget.treeNode-type.branch",
			},
			NodeUtils: NodeUtils,
			currentNode: null /* object node used by jsTree */
		}
	},
	watch: {
		'mission' : function( mission, oldMission ) {
			if( oldMission ){
				this.save( oldMission );
			}
			if( mission ) {
				let tree = mission['tree'] || new JSTreeNode( undefined, new I18nString(i18nContent, mission.title ), NodeUtils.Types.Root, createEmptyData(), [] );
				console.info( "[ActivityEditor]", "changed mission tree", tree );
				this.$nextTick( function () {
					this.loadTree( tree ); // load tree into Tree component
				})
			}
			else{
				this.loadTree( null );
			}
		}
	},
	computed: {
		localeTitle: 		function () {  return this.currentNode && this.currentNode.id ? 'activity.title.' + this.currentNode.id : null },
		localeDescription: 	function () {  return this.currentNode && this.currentNode.id ? 'activity.description.' + this.currentNode.id : null }
	},
	methods: {
		// serialize tree data and set it to parent mission
		save( mission ){
			let tree = this.$refs.treeView.get_json();
			Vue.set( mission, "tree", tree );
			console.log( "[ActivityEditor]", "Saving tree data", tree, "into mission", mission );
		},
		// load the tree on TreeWidget
		loadTree( tree ) {
			this.$refs.treeView.load( tree );
		},
		// callback which load the node to the editor
		loadNode( node ) {
			console.info( "[ActivityEditor]", "Loading current activity", activity );
			this.currentNode = node;
		},

		// events and utilities
		shouldShowTypeInSelector( type ){
			if( !this.currentNode || !type ){
				return false;
			}

			switch( type ){
				case NodeUtils.Types.Tell:
				case NodeUtils.Types.Quest:
					return [NodeUtils.Types.Root, NodeUtils.Types.Branch, NodeUtils.Types.Tell].includes( this.currentNode.type );
					break;
				case NodeUtils.Types.Branch:
					return NodeUtils.Types.Quest == this.currentNode.type;
					break;
			}

			return true;
		},
		isActivity( checkType ) {
			if( checkType ){
				return this.currentNode && this.currentNode.type == checkType;
			}
			else if( this.currentNode && (this.currentNode.type == NodeUtils.Types.Quest || this.currentNode.type == NodeUtils.Types.Tell) ) {
				return true;
			}
			return false;
		},
		onAdd( event ){
			let inputs = $( event.currentTarget).serializeArray();
			let nodeInfo = {};
			// set key and value as pair
			for( let i = 0; i < inputs.length; i++ ) {
				nodeInfo[ inputs[i]["name"] ] = inputs[i]["value"];
			}

			let id = this.nextId++;
			this.$emit( "inc-Id");

			// TODO: fill this field if adding components which edit node data
			let data = createEmptyData();
			data.noteInfo = {
				name: nodeInfo["node-name"],
			};
			data.title = 'activity.title.'+id;
			data.description = 'activity.description.'+id;

			let item = this.$refs.treeView.add( id, nodeInfo["node-type"], data.noteInfo.name, data );

			// clear form
			if( item ){
				$( event.currentTarget).trigger("reset");
			}
		},
		onRemove(){
			this.$refs.treeView.remove();
		},
		onDuplicate(){
			this.$refs.treeView.duplicate();
		}
	}
};
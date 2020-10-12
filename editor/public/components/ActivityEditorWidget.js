import {template} from "./ActivityEditorWidgetTemplate.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as activityToolbar} from "./ActivityToolbarWidget.js";
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
		'activity-tree-widget': activityTreeWidgetComponent,
		'toolbar': activityToolbar,
		'branch-editor-widget': conditionActivityOptionWidget
	},
	data() {
		return {
			funz: {
				name:"lol",
				arguments:[{
					accetps:["time","text"],
					value:''
				}]
			},
			branch:Object,
			shouldShowTree: false,
			activityId: null,
			refresh: false,
			nodeTypes: {
				[NodeUtils.Types.Tell]: "ActivityEditorWidget.treeNode-type.tell",
				[NodeUtils.Types.Quest]: "ActivityEditorWidget.treeNode-type.quest",
				[NodeUtils.Types.Branch]: "ActivityEditorWidget.treeNode-type.branch",
			},
			NodeUtils: NodeUtils,
			currentNode: null /* object node used by jsTree */,
			isAddFormVisible: false,
			isEditFormVisible: false,
			selectedType: null,
			tmpNodeName: null,
			tmpNodeNote: null
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
		showActivityForm: function () { return this.isAddFormVisible || ( this.isEditFormVisible && !this.isActivity("#") ) },
		activityTitle: function () {
			if( this.currentNode ) {
				if( this.currentNode.data.title ) {
					return this.currentNode.data.title;
				}
				else { // will register new label
					return 'activity.title.' + this.currentNode.id
				}
			}
			return null;
		},
		activityDescription: function () {
			if( this.currentNode ) {
				if( this.currentNode.data.description ) {
					return this.currentNode.data.description;
				}
				else { // will register new label
					return 'activity.description.' + this.currentNode.id
				}
			}
			return null;
		}
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
		getCondition(condition){
			this.branch.condition=condition.condition;
			this.branch.params=condition.params.slice(0, condition.params.length);
		},
		isSelected( checkType ) {
			if( checkType ){
				return this.selectedType == checkType;
			}
			else if( this.selectedType == NodeUtils.Types.Quest || this.selectedType == NodeUtils.Types.Tell ) {
				return true;
			}
			return false;
		},
		checkType( type ) { return this.isAddFormVisible ? this.isSelected( type ) : this.isActivity( type ) },
		onSubmit( event ) {
			if (this.isAddFormVisible) this.onAdd( event )
			else if (this.isEditFormVisible) this.onEdit( event )
		},
		onSelectedNode() {
			this.selectedType = null;
		},
		onAdd( event ) {
			let inputs = $(event.currentTarget).serializeArray();
			let nodeInfo = {};
			// set key and value as pair
			for (let i = 0; i < inputs.length; i++) {
				nodeInfo[inputs[i]["name"]] = inputs[i]["value"];
			}

			let id = this.nextId; this.$emit("inc-id");

			// TODO: fill this field if adding components which edit node data
			let data = createEmptyData();
			data.noteInfo = {
				name: nodeInfo["node-name"],
				note: nodeInfo["node-note"]
			};
			data.title = 'activity.title.' + id;
			data.description = 'activity.description.' + id;
			data.scene = { grid: [] };
			let item = this.$refs.treeView.add(id, nodeInfo["node-type"], data.noteInfo.name, data);

			// clear form
			if (item) {
				$(event.currentTarget).trigger("reset");
			}
			this.isAddFormVisible = false;
			this.selectedType = null;
			this.tmpNodeName = null;
			this.tmpNodeNote = null;
		},
		onEdit( event ) {
			let inputs = $(event.currentTarget).serializeArray();
			let nodeInfo = {};
			// set key and value as pair
			for (let i = 0; i < inputs.length; i++) {
				nodeInfo[inputs[i]["name"]] = inputs[i]["value"];
			}

			let data = createEmptyData();
			data.noteInfo = {
				name: nodeInfo["node-name"],
				note: nodeInfo["node-note"]
			};

			this.$refs.treeView.edit(data);

			$(event.currentTarget).trigger("reset");
			this.isEditFormVisible = false;
		}
	},
	mounted() {
		$(document).on("addToolbar", () => {
			this.isEditFormVisible = false;
			this.isAddFormVisible = true;
		});
		$(document).on("editToolbar", () => {
			this.isAddFormVisible = false;
			this.isEditFormVisible = true;
		});
		$(document).on("duplicateToolbar", () => {
			this.$refs.treeView.duplicate();
		});
		$(document).on("removeToolbar", () => {
			this.$refs.treeView.remove();
		});
		$(document).on("grabToolbar", () => {
			this.$refs.treeView.grab();
		});
		$(document).on("dropToolbar", () => {
			this.$refs.treeView.drop();

		});
	}
};
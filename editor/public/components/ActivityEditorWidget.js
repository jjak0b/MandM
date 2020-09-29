import {template} from "./ActivityEditorWidgetTemplate.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as activityToolbar} from "./ActivityToolbarWidget.js";
import JSTreeNode from "../js/JSTreeNode.js";
import NodeUtils from "../js/NodeUtils.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import { I18nString } from "/shared/js/I18nUtils.js";
import { component as addMenuComponent } from "./ActivityEditorAddMenuWidget.js ";
import { component as editMenuComponent } from "./ActivityEditorEditMenuWidget.js ";

export const component = {
	template: template,
	props: {
		nextAssetId: Number,
		nextId: Number,
		locale: String,
		mission : Object
	},
	components: {
		'activity-tree-widget': activityTreeWidgetComponent,
		'toolbar': activityToolbar,
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'add-menu-widget': addMenuComponent,
		'edit-menu-widget': editMenuComponent
	},
	data() {
		return {
			NodeUtils: NodeUtils,
			currentNode: null /* object node used by jsTree */,
			isEditFormVisible: false
		}
	},
	watch: {
		'mission' : function( mission, oldMission ) {
			if( oldMission ){
				this.save( oldMission );
			}
			if( mission ) {
				let tree = mission['tree'] || new JSTreeNode( undefined, new I18nString(this.$i18n, mission.title, this.locale), NodeUtils.Types.Root, {}, [] );
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
		// events
		onAdd( data ) {
			let item = this.$refs.treeView.add(this.nextId, data.noteInfo.type, data.noteInfo.name, data);

			this.$nextTick(() => {
				this.$refs.addMenu.$bvModal.hide('addMenu');
				this.$emit("inc-id");
			});
		},
		onEdit( noteInfo ) {
			let item = this.$refs.treeView.edit( noteInfo );
			this.isEditFormVisible = false;
		},
		onSelectedNode() {
			this.isEditFormVisible = false;
			this.$emit("inc-id");
		}
	},
	mounted() {
		$(document).on("addToolbar", () => {
			this.isEditFormVisible = false;
			this.$refs.addMenu.$bvModal.show('addMenu');
		});
		$(document).on("editToolbar", () => {
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
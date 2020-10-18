import {template} from "./ActivityEditorWidgetTemplate.js";
import {component as activityTreeWidgetComponent} from "../ActivityTreeWidget.js";
import {component as activityToolbar} from "../ActivityToolbarWidget.js";
import JSTreeNode from "../../js/JSTreeNode.js";
import NodeUtils from "../../js/NodeUtils.js";
import {component as asyncLoadComponentI18nInputWidget} from "../i18nWidgets/I18nInputWidget.js";
import { I18nString } from "/shared/js/I18nUtils.js";
import { component as addMenuComponent } from "./ActivityEditorAddMenuWidget.js ";
import { component as editMenuComponent } from "./ActivityEditorEditMenuWidget.js ";
import {I18nUtils} from "/shared/js/I18nUtils.js";

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
			if( mission ) {
				let tree = null;
				let self = this;
				let i18nConfig = {
					method: "t",
					params: () => [ self.locale, undefined ]
				}
				if( mission['tree'] ) {
					tree = mission['tree'];

					// if true then this means that we are loading a just imported, but not parsed tree
					if( tree.text && !( tree.text instanceof I18nString ) ) {

						tree = new JSTreeNode(
							tree.id,
							new I18nString( this.$i18n, tree.text.label, i18nConfig ),
							tree.type,
							tree.data,
							tree.children
						);
					}
				}
				else{
					tree = new JSTreeNode( undefined, new I18nString(this.$i18n, mission.title, i18nConfig ), NodeUtils.Types.Root, {}, [] );
				}
				console.info( "[ActivityEditor]", "changed mission tree", tree );
				this.$nextTick( function () {
					this.loadTree( tree ); // load tree into Tree component
				})
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
			this.$emit("save-story");
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
			let id = I18nUtils.getUniqueID();
			let prefix = `${this.mission.i18nCategory}.activity.${id}`;
			data.i18nCategory = prefix;
			data.title = prefix + ".title";
			data.description = prefix + ".description";
			data.scene = {};

			let item = this.$refs.treeView.add(id, data.noteInfo.type, data.noteInfo.name, data);
			this.$emit('add-activity', data);

			this.$nextTick(() => {
				this.$refs.addMenu.$bvModal.hide('addMenu');
				this.$emit("inc-id");
			});
			this.save(this.mission);
		},
		onEdit( noteInfo ) {
			let item = this.$refs.treeView.edit( noteInfo );
			this.isEditFormVisible = false;
			this.save(this.mission);
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
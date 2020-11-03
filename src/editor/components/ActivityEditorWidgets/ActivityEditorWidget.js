import {template} from "./ActivityEditorWidgetTemplate.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as activityToolbar} from "./ActivityToolbarWidget.js";
import NodeUtils from "../../js/NodeUtils.js";
import {component as asyncLoadComponentI18nInputWidget} from "../i18nWidgets/I18nInputWidget.js";
import { I18nString, I18nUtils } from "../../../shared/js/I18nUtils.js";
import { component as addMenuComponent } from "./ActivityEditorAddMenuWidget.js ";
import { component as editMenuComponent } from "./ActivityEditorEditMenuWidget.js ";
import ActivityNode from "../../js/ActivityNodes/ActivityNode.js";
// Adding these will register them as parsable Nodes
import ActivityNodeTell from "../../js/ActivityNodes/ActivityNodeTell.js";
import ActivityNodeQuest from "../../js/ActivityNodes/ActivityNodeQuest.js";
import NodeParser from "../../js/NodeParser.js";

export const component = {
	template: template,
	props: {
		locale: String,
		mission : Object,
		localesList: Array
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
					tree.text = new I18nString(this.$i18n, mission.title, i18nConfig );
				}
				else{
					let unparsedNode = {
						id: mission.id,
						text: new I18nString(this.$i18n, mission.title, i18nConfig ),
						type: NodeUtils.Types.Root,
						data: null,
						children: []
					};
					tree = NodeParser.parse( unparsedNode );
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
	created() {
		ActivityNode.setDisposeCallback( ActivityNode.name, this.disposeActivityNode )
		ActivityNodeTell.setDisposeCallback( ActivityNodeTell.name, this.disposeActivityNode )
		ActivityNodeQuest.setDisposeCallback( ActivityNodeQuest.name, this.disposeActivityNode )
	},
	methods: {
		disposeActivityNode( node ) {
			if( node.data ) {
				if( node.data.title ) this.$i18n.removeMessageAll( node.data.title );
				if( node.data.description ) this.$i18n.removeMessageAll( node.data.description );
			}
		},
		// serialize tree data and set it to parent mission
		save( mission ){
			let tree = this.$refs.treeView.get_json();
			this.$set( mission, "tree", tree );
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
		onAdd( unparsedNode ) {
			let id = I18nUtils.getUniqueID();
			let prefix = `${this.mission.i18nCategory}.activity.${id}`;

			let data = unparsedNode.data;
			unparsedNode.id = id;
			data.i18nCategory = prefix;
			data.title = prefix + ".title";
			data.description = prefix + ".description";

			let activityNode = NodeParser.parse( unparsedNode );
			let item = this.$refs.treeView.add( activityNode );

			// this.$emit('add-activity', data);

			this.$nextTick(() => {
				this.$refs.addMenu.$bvModal.hide('addMenu');
			});
			this.save(this.mission);
		},
		onRemove() {
			// save the full updated and parsed tree from jstree's structure to be able to parse it and after dispose from the current node
			this.$nextTick( () => {
				/* 	this will parse all subtree
					we couldn't use the saved currentNode directly because the subtree isn't parsed so we couldn't dispose them
				 */
				let subtree = this.$refs.treeView.get_json( this.currentNode.id );

				if( subtree ) {
					if( subtree.dispose ) {
						subtree.dispose();
					}
					else {
						// just for debugging
						console.warn("[ActivityEditor]","Trying to dispose subtree withput dispose", subtree );
					}
				}
				this.$refs.treeView.remove();
				this.save(this.mission);
			});

		},
		onEdit() {
			let node = this.currentNode;
			this.$set( node, "text", node.data.noteInfo.name );
			this.isEditFormVisible = false;
			this.save(this.mission);
		},
		onSelectedNode() {
			this.isEditFormVisible = false;
			this.$emit("inc-id");
		},
		onGrab() {
			this.$refs.treeView.grab();
		},
		onDrop() {
			this.$refs.treeView.drop();
		},
		onCopy() {
			this.$refs.treeView.duplicate();
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
			this.onCopy();
		});
		$(document).on("removeToolbar", () => {
			this.onRemove();
		});
		$(document).on("grabToolbar", () => {
			this.onGrab();
		});
		$(document).on("dropToolbar", () => {
			this.onDrop();
		});
	}
};
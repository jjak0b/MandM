import {template} from "./ActivityEditorWidgetTemplate.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import NodeUtils from "../../../shared/js/NodeUtils.js";
import {component as asyncLoadComponentI18nInputWidget} from "../i18nWidgets/I18nInputWidget.js";
import { I18nString, I18nUtils } from "../../../shared/js/I18nUtils.js";
import { component as addMenuComponent } from "./ActivityEditorAddMenuWidget.js ";
import { component as editMenuComponent } from "./ActivityEditorEditMenuWidget.js ";
import ActivityNode from "../../../shared/js/ActivityNodes/ActivityNode.js";
// Adding these will register them as parsable Nodes
import ActivityNodeTell from "../../../shared/js/ActivityNodes/ActivityNodeTell.js";
import ActivityNodeQuest from "../../../shared/js/ActivityNodes/ActivityNodeQuest.js";
import ActivityNodeBranch from "../../../shared/js/ActivityNodes/ActivityNodeBranch.js";
import NodeParser from "../../../shared/js/NodeParser.js";
import {registerDisposeCallbacks as registerSceneDisposeCallbacks } from "./SceneEditorWidget.js";

export const component = {
	template: template,
	props: {
		locale: String,
		mission : Object,
		localesList: Array,
		copiedActivity: Object,
		grabbedActivity: Object
	},
	components: {
		'activity-tree-widget': activityTreeWidgetComponent,
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'add-menu-widget': addMenuComponent,
		'edit-menu-widget': editMenuComponent
	},
	data() {
		return {
			NodeUtils: NodeUtils,
			currentNode: null /* object node used by jsTree */,
			parentNode: null,
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
						type: NodeUtils.Types.Mission,
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
	created() {
		ActivityNode.setDisposeCallback( ActivityNode.name, this.disposeActivityNode );
		ActivityNodeTell.setDisposeCallback( ActivityNodeTell.name, this.disposeActivityNode );
		ActivityNodeQuest.setDisposeCallback( ActivityNodeQuest.name, this.disposeActivityQuestNode );
		registerSceneDisposeCallbacks.call( this );
	},
	methods: {
		disposeActivityNode( node ) {
			if( node.data ) {
				if( node.data.title ) this.$i18n.removeMessageAll( node.data.title );
				if( node.data.description ) this.$i18n.removeMessageAll( node.data.description );
			}
		},
		disposeActivityQuestNode( node ) {
			if( node.data.message ) {
				this.$i18n.removeMessageAll( node.data.message );
			}
		},
		getActivityById( id, children ) {
			if (children) {
				let copiedActivity = children.find((child) => child.id === id);
				if (copiedActivity) return copiedActivity
				for ( let child of children ) {
					if ( child.children ) {
						copiedActivity = this.getActivityById(id, child.children);
						if (copiedActivity) return copiedActivity
					}
				}
				return null
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
		// events
		addActivity( unparsedNode ) {
			let id = I18nUtils.getUniqueID();
			let prefix = `${this.mission.i18nCategory}.activity.${id}`;

			let data = unparsedNode.data;
			unparsedNode.id = id;
			data.i18nCategory = prefix;
			data.title = prefix + ".title";
			data.description = prefix + ".description";
			data.active = true;

			let activityNode = NodeParser.parse( unparsedNode );
			let item = this.$refs.treeView.add( activityNode );

			this.$nextTick(() => {
				this.$refs.addMenu.$bvModal.hide('addMenu');
			});
			this.save(this.mission);
		},
		editActivity() {
			let node = this.currentNode;
			this.$set( node, "text", node.data.noteInfo.name );
			this.isEditFormVisible = false;
			this.save(this.mission);
		},
		onAddActivity() {
			this.isEditFormVisible = false;
			this.$refs.addMenu.$bvModal.show('addMenu');
		},
		onEditActivity() {
			this.isEditFormVisible = true;
		},
		onRemoveActivity() {
			// save the full updated and parsed tree from jstree's structure to be able to parse it and after dispose from the current node
			// this.$nextTick( () => {
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
				this.isEditFormVisible = false;

				// this.save(this.mission);
			// });

		},
		onGrabActivity() {
			let copiedId = this.$refs.treeView.tree.get_selected(true)[0].id;
			let copiedActivity = this.getActivityById( copiedId, this.mission.tree.children);
			if (copiedActivity) {
				console.log("[ActivityEditor]", "Grabbed activity", copiedActivity);
				this.$emit('grab-activity', copiedActivity);
				this.onRemoveActivity();
			}
		},
		onDropActivity() {
			if (!this.grabbedActivity) {
				return
			}
			this.grabbedActivity.i18nTupleList = [];
			let newActivity = this.grabbedActivity.duplicate(this.grabbedActivity.i18nTupleList, this.mission.i18nCategory );
			let localesCopy = I18nUtils.copyOldLabelsToNewLabels( this.grabbedActivity.locales, this.grabbedActivity.i18nTupleList );
			for (const locale in localesCopy) {
				this.$i18n.mergeLocaleMessage(locale, localesCopy[locale] );
			}
			this.grabbedActivity.i18nTupleList = undefined;
			this.grabbedActivity.locales = undefined;

			console.log("[ActivityEditor]", "Dropped activity", newActivity);
			this.$refs.treeView.add(newActivity);
			this.$emit('grab-activity', null);
			this.save(this.mission);
		},
		onCopyActivity() {
			let copiedId = this.$refs.treeView.tree.get_selected(true)[0].id;
			let copiedActivity = this.getActivityById( copiedId, this.mission.tree.children);
			if (copiedActivity) {
				console.log("[ActivityEditor]", "Copied activity", copiedActivity);
				this.$emit('copy-activity', copiedActivity);
			}
		},
		onPasteActivity() {
			if (!this.copiedActivity) {
				return
			}
			this.copiedActivity.i18nTupleList = [];
			let newActivity = this.copiedActivity.duplicate(this.copiedActivity.i18nTupleList, this.mission.i18nCategory );
			let localesCopy = I18nUtils.copyOldLabelsToNewLabels( this.copiedActivity.locales, this.copiedActivity.i18nTupleList );
			for (const locale in localesCopy) {
				this.$i18n.mergeLocaleMessage(locale, localesCopy[locale] );
			}
			this.copiedActivity.i18nTupleList = undefined;

			console.log("[ActivityEditor]", "Pasted activity", newActivity);
			this.$refs.treeView.add(newActivity);
			this.save(this.mission);
		},
		onEnableActivity() {
			this.$refs.treeView.disable();
			this.save(this.mission);
		},
		onSelectedNode() {
			this.isEditFormVisible = false;
		}
	}
};
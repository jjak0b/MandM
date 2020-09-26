import {template} from "./ActivityEditorAddMenuWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as activityTaleEditorComponent} from "./ActivityTaleEditorWidget.js";
import {component as activityQuestEditorComponent} from "./ActivityQuestEditorWidget.js";
import {component as conditionActivityOptionWidget} from "./BranchEditorWidget.js";
import { component as sceneEditorComponent } from "./SceneEditorWidget.js ";
import NodeUtils from "../js/NodeUtils.js";
export const component = {
	template: template,
	props: {
		locale: String,
		currentNode: Object,
		nextId: Number,
		nextAssetId: Number
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'scene-editor-widget' :sceneEditorComponent,
		'activity-tale-editor-widget': activityTaleEditorComponent,
		'activity-quest-editor-widget': activityQuestEditorComponent,
		'branch-editor-widget': conditionActivityOptionWidget
	},
	data() {
		return {
			selectedType: null,
			NodeUtils: NodeUtils,
			tmpScene: { grid: [] }
		}
	},
	computed: {
		menuTitle: function () { return this.$t('ActivityEditorWidget.label-add-menu-title') },
		treeTab: function () { return this.$t('ActivityEditorWidget.label-tree-tab') },
		activityTab: function () { return this.$t('ActivityEditorWidget.label-activity-tab') },
		sceneTab: function () { return this.$t('ActivityEditorWidget.label-scene-tab') },
		taleTab: function () { return this.$t('ActivityEditorWidget.label-tale-tab') },
		questTab: function () { return this.$t('ActivityEditorWidget.label-quest-tab') },
		branchTab: function () { return this.$t('ActivityEditorWidget.label-branch-tab') },
		nodeTypeLabel: function () { return this.$t('ActivityEditorWidget.label-select-nodeType') },
		typeTell: function () { return this.$t('ActivityEditorWidget.treeNode-type.tell.description') },
		typeQuest: function () { return this.$t('ActivityEditorWidget.treeNode-type.quest.description') },
		typeBranch: function () { return this.$t('ActivityEditorWidget.treeNode-type.branch.description') },
		nodeName: function () { return 'node.name.' + this.nextId },
		nodeNote: function () { return 'node.note.' + this.nextId },
		activityTitle: function () { return 'activity.title.' + this.nextId },
		activityDescription: function () { return 'activity.description.' + this.nextId },
		nodeNameLabel: function () { return this.$t('ActivityEditorWidget.label-node-item-name') },
		nodeNoteLabel: function () { return this.$t('ActivityEditorWidget.label-node-item-description') },
		activityTitleLabel: function () { return this.$t('ActivityEditorWidget.label-activity-title') },
		activityDescriptionLabel: function () { return this.$t('ActivityEditorWidget.label-activity-description') },
		nodeNamePlaceholder: function () { return this.$t('ActivityEditorWidget.label-activity-no-title' ) }
	},
	methods: {
		isType( checkType ) {
			if( checkType ){
				return this.selectedType == checkType;
			}
			else if( this.selectedType == 'quest' || this.selectedType == 'tell' ) {
				return true;
			}
			return false;
		},
		onSubmit() {
			let id = this.nextId;

			// TODO: fill this field if adding components which edit node data
			let data = {};
			data.noteInfo = {
				name: 'node.name.' + id,
				note: 'node.note.' + id,
				type: this.selectedType
			};
			data.title = 'activity.title.' + id;
			data.description = 'activity.description.' + id;
			data.scene = this.tmpScene;

			this.tmpScene = null;
			this.$emit('addActivity', data);
		},
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
		}
	}
};
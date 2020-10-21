import {template} from "./ActivityEditorEditMenuWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "../i18nWidgets/I18nInputWidget.js";
import {component as activityTaleEditorComponent} from "./ActivityTaleEditorWidget.js";
import {component as activityQuestEditorComponent} from "./ActivityQuestEditorWidget.js";
import {component as conditionActivityOptionWidget} from "./BranchEditorWidget.js";
import { component as sceneEditorComponent } from "./SceneEditorWidget.js ";
import NodeUtils from "../../js/NodeUtils.js";

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
			NodeUtils: NodeUtils,
			nameValue: '',
			noteValue: ''
		}
	},
	watch: {
		noteInfo: {
			immediate: true,
			deep: true,
			handler( newNoteInfo ) {
				if( newNoteInfo ) {
					this.nameValue = newNoteInfo.name;
					this.noteValue = newNoteInfo.note;
				}
			}
		}

	},
	computed: {
		menuTitle: function () { return this.$t('ActivityEditorWidget.label-edit-menu-title') },
		treeTab: function () { return this.$t('ActivityEditorWidget.label-tree-tab') },
		activityTab: function () { return this.$t('ActivityEditorWidget.label-activity-tab') },
		sceneTab: function () { return this.$t('ActivityEditorWidget.label-scene-tab') },
		taleTab: function () { return this.$t('ActivityEditorWidget.label-tale-tab') },
		questTab: function () { return this.$t('ActivityEditorWidget.label-quest-tab') },
		branchTab: function () { return this.$t('ActivityEditorWidget.label-branch-tab') },
		activityTitle: function () { return this.currentNode ? this.currentNode.data.title : null; },
		activityDescription: function () { return this.currentNode ? this.currentNode.data.description : null; },
		nodeNameLabel: function () { return this.$t('ActivityEditorWidget.label-node-item-name') },
		nodeNoteLabel: function () { return this.$t('ActivityEditorWidget.label-node-item-description') },
		activityTitleLabel: function () { return this.$t('ActivityEditorWidget.label-activity-title') },
		activityDescriptionLabel: function () { return this.$t('ActivityEditorWidget.label-activity-description') },
		noteInfo: function () { return ( this.currentNode.data.noteInfo ? this.currentNode.data.noteInfo : null ) },
	},
	methods: {
		isType( checkType ) {
			if( checkType ){
				return this.currentNode && this.currentNode.type == checkType;
			}
			else if( this.currentNode && (this.currentNode.type == NodeUtils.Types.Quest || this.currentNode.type == NodeUtils.Types.Tell) ) {
				return true;
			}
			return false;
		},
		onSubmit() {
			let noteInfo = {
				name: this.nameValue,
				note: this.noteValue
			}
			this.$emit('editActivity', noteInfo);
		}
	}
};
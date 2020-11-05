import {template} from "./ActivityEditorAddMenuWidgetTemplate.js";
import NodeUtils from "../../../shared/js/NodeUtils.js";

export const component = {
	template: template,
	props: {
		locale: String,
		currentNode: Object
	},
	data() {
		return {
			selectedType: null,
			state: null,
			nameValue: "",
			noteValue: "",
			NodeUtils: NodeUtils
		}
	},
	computed: {
		menuTitle: function () { return this.$t('ActivityEditorWidget.label-add-menu-title') },
		treeTab: function () { return this.$t('ActivityEditorWidget.label-tree-tab') },
		nodeTypeLabel: function () { return this.$t('ActivityEditorWidget.label-select-nodeType') },
		typeTell: function () { return this.$t('ActivityEditorWidget.treeNode-type.tell.description') },
		typeQuest: function () { return this.$t('ActivityEditorWidget.treeNode-type.quest.description') },
		typeBranch: function () { return this.$t('ActivityEditorWidget.treeNode-type.branch.description') },
		nodeNameLabel: function () { return this.$t('ActivityEditorWidget.label-node-item-name') },
		nodeNoteLabel: function () { return this.$t('ActivityEditorWidget.label-node-item-description') },
		saveLabel: function () { return this.$t('shared.label-save') },
		validFeedback: function () { return this.$t('ActivityEditorWidget.add-menu-valid-feedback' ) },
		invalidFeedback: function () { return this.$t('ActivityEditorWidget.add-menu-invalid-feedback' ) },
	},
	methods: {
		checkFormValidity() {
			const valid = this.$refs.form.checkValidity();
			this.state = valid;
			return valid
		},
		resetModal() {
			this.nameValue = "";
			this.noteValue = "";
			this.selectedType = null;
			this.state = null;
		},
		onSelect() {
			if (this.state === false) this.state = true;
		},
		onOk(bvModalEvt) {
			bvModalEvt.preventDefault();
			this.onSubmit();
		},
		onSubmit() {
			if (!this.checkFormValidity()) {
				return
			}

			let unparsedNode = {
				type: this.selectedType,
				text: this.nameValue,
				data: {
					noteInfo : {
						name: this.nameValue,
						note: this.noteValue
					}
				}
			};

			this.$emit('addActivity', unparsedNode );
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
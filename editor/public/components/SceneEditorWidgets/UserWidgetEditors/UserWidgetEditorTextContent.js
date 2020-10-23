import {template} from "./UserWidgetEditorTextContentTemplate.js";
import {component as textContentEditor} from "../../i18nWidgets/I18nEditorWidget.js";
import {component as textContentComponent} from "/shared/components/UserWidgetTextContent.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String,
		nextAssetId: Number,
		localesList: Array
	},
	components: {
		"text-editor": textContentEditor,
		"text-content": textContentComponent
	},
	data() {
		return {
			assetId: this.nextAssetId,
			localeLabel: "assets.textcontent." + this.assetId
		}
	},
	mounted() {
		this.$emit('set-prop','localeLabel', this.localeLabel);
	}
}
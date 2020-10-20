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
			localeLabel: "assets.textcontent." + this.nextAssetId
		}
	},
	mounted() {
		this.$emit('add-label', this.localeLabel);
	}
}
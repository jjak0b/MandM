import {template} from "./UserWidgetEditorTextInputTemplate.js";
import {component as textInputComponent} from "/shared/components/UserWidgetTextInput.js";
import {component as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String,
		nextAssetId: Number,
		localesList: Array
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		"user-widget-text-input": textInputComponent
	},
	data() {
		return {
			assetId: this.nextAssetId,
			localeLabel: "assets.textinput.placeholder." + this.assetId
		}
	},
	mounted() {
		this.$emit('set-prop', 'localeLabel', this.localeLabel);
	}
}
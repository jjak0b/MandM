import {template} from "./UserWidgetEditorInputTemplate.js";
import {component as inputComponent} from "../../../../shared/components/UserWidgetInput.js";
import ComponentInput from "../../../../shared/js/Scene/SceneComponents/ComponentInput.js";
import {component as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";

export const component = {
	template: template,
	props: {
		component: ComponentInput,
		locale: String
	},
	computed: {
		inputData() { return this.component.props }
	},
	created() {
		if ( this.component.name === "user-widget-range" ) this.inputData.type = 'range'
		else if ( this.component.name === "user-widget-number-input" ) this.inputData.type = 'number'
		else this.inputData.type = 'text'
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		"user-widget-input": inputComponent
	}
}
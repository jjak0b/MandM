import {template} from "./UserWidgetEditorTimepickerTemplate.js";
import {component as timepickerComponent} from "../../../../shared/components/UserWidgetTimepicker.js";
import ComponentTime from "../../../../shared/js/Scene/SceneComponents/ComponentTime.js";
import {component as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";

export const component = {
	template: template,
	props: {
		component: ComponentTime,
		locale: String
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		"user-widget-timepicker": timepickerComponent
	},
	data() {
		return {

		}
	}
}
import { template } from "./ActivityQuestEditorWidgetTemplate.js";
import ActivityDataQuest from "../../../shared/js/ActivityNodes/ActivityDataTypes/ActivityDataQuest.js";
import {component as i18nInputWidget } from "../i18nWidgets/I18nInputWidget.js";

export const component = {
	template: template,
	components: {
		i18nInputWidget
	},
	props: {
		value: ActivityDataQuest,
		locale: String
	},
	data() {
		return {

		}
	}
};
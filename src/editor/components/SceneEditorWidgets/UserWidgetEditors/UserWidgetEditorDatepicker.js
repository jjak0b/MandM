import {template} from "./UserWidgetEditorDatepickerTemplate.js";
import {component as datepickerComponent} from "../../../../shared/components/UserWidgetDatepicker.js";
import ComponentDate from "../../../../shared/js/Scene/SceneComponents/ComponentDate.js";

export const component = {
	template: template,
	props: {
		component: ComponentDate,
		locale: String
	},
	components: {
		"user-widget-datepicker": datepickerComponent
	},
	beforeUpdate() {
		this.startWeekdays[0].text = getDayName( 2020, 1, 3); // Monday
		this.startWeekdays[1].text = getDayName( 2020, 1, 1); // Saturday
		this.startWeekdays[2].text = getDayName( 2020, 1, 2); // Sunday
	},
	data() {
		return {
			startWeekdays: [
				{value: 1, text: 'Monday'},
				{value: 6, text: 'Saturday'},
				{value: 0, text: 'Sunday'}
			],
			colorVariants: [
				"primary",
				"secondary",
				"success",
				"warning",
				"danger",
				"info",
				"light",
				"dark"
			]
		}
	}
}

function getDayName(year, month, date, locale)  {
	return new Date(Date.UTC(year,  month, date)).toLocaleDateString(locale, { weekday: 'long' });
}

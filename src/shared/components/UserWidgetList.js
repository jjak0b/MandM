import {template} from "./UserWidgetListTemplate.js";

export const component = {
	template: template,
	props: {
		locale: String,
		localesList: Array,
		options: Array,
		name: String
	},
	data() {
		return {
			widgetsTable: {
				"user-widget-checkbox" : {
					list: "b-form-checkbox-group",
					item: "b-form-checkbox",
				},
				"user-widget-select" : {
					list: "b-form-select",
					item: "b-form-select-option",
				},
				"user-widget-radio" : {
					list: "b-form-radio-group",
					item: "b-form-radio",
				},
			}
		}
	},
	methods: {
		getContent( localeLabel ){
			let content = this.$i18n.t( localeLabel, this.locale );
			if( !content || content === localeLabel )
				return "";
			else
				return content;
		}
	}
};
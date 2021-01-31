import {template} from "./UserWidgetTimepickerTemplate.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";
import Time from "../../shared/js/Types/Time.js";

export const component = {
	template: template,
	props: {
		data: Object,
		value: Object,
		locale: String,
		localeLabel: String,
		classes: Array
	},
	methods: {
		editValue(event) {
			this.value.type = Time.name;
			this.value.value = event;
		},
		emitInput() {
			if ( this.value.type ) {
				this.$el.dispatchEvent(new Event('change', { bubbles: true }));
			}
		},
		getContent(){
			let content = this.$i18n.t( this.localeLabel, this.locale );
			if( !content || content === this.localeLabel )
				return "";
			else
				return content;
		}
	}
};
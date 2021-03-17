import {template} from "./UserWidgetDatepickerTemplate.js";
import {TypedValue} from "../js/Types/TypedValue.js";

export const component = {
	template: template,
	props: {
		data: Object,
		value: Object,
		classes: Array
	},
	data() {
		return {
			prevLocale: null,
			labels: [
				"label-prev-decade",
				"label-prev-year",
				"label-prev-month",
				"label-current-month",
				"label-next-month",
				"label-next-year",
				"label-next-decade",
				"label-today",
				"label-selected",
				"label-no-date-selected" ,
				"label-calendar",
				"label-nav",
				"label-help"
			],
			localeLabels: {

			}
		}
	},
	beforeMount() {
		this.translateLabels();
	},
	beforeUpdate() {
		this.translateLabels();
	},
	methods: {
		translateLabels() {
			if( this.prevLocale != this.$i18n.locale ) {
				this.prevLocale = this.$i18n.locale;
				let self = this;
				this.labels.forEach( (label, index) => {
					let localeLabel = "UserWidgets.Datepicker." + label
					let message =  self.$i18n.t( localeLabel );

					if( message && message != localeLabel ) {
						self.$set( self.localeLabels, label, message );
					}
					else {
						self.$set( self.localeLabels, label, undefined );
						delete self.localeLabels[ label ];
					}
				});
			}
		},
		editValue(event) {
			this.value.type = Date.name;
			this.value.value = event;
		},
		emitInput(event) {
			if ( this.value.type ) {
				this.$el.dispatchEvent(new Event('change', { bubbles: true }));
			}
		},
	}
};
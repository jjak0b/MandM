import {template} from "./I18nSelectorWidgetTemplate.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";

export const component = {
	template: template,
	props: {
		"value": String
	},
	data(){
		return {
			localesList: {},
			globalLocalesList: I18nUtils.i18nCodes,
			globalLocaleSelected: navigator.language
		}
	},
	beforeMount: function() {
		let self = this;

	},
	methods: {
		add: function() {
			let code = this.globalLocaleSelected;
			let lang = this.globalLocalesList[ code ];
			this.$set( this.localesList, code, lang);
		},
		/* Notify to parent a value change */
		notifyValue: function ( value ) {
			this.$emit( 'input', value );
		}
	}
};

export const asyncLoad = function ( resolve, reject ) {
	I18nUtils.fetchCodes()
		.then( (data) => {
			resolve( component );
		})
		.catch( (error) => {
			reject(error);
		});
};
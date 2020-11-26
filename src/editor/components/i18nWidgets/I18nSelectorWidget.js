import {template} from "./I18nSelectorWidgetTemplate.js";
import { I18nUtils } from "../../../shared/js/I18nUtils.js";

export const component = {
	template: template,
	props: {
		localesList: Array,
		locale: String
	},
	data(){
		return {
			I18nUtils: I18nUtils,
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
			if( !this.localesList.includes( code ) ) {
				this.localesList.push( code );
			}
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
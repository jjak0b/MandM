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
	watch: {
		"localesList" : function() {
			this.onLocalesListChange();
		}
	},
	beforeMount() {
		this.onLocalesListChange();
	},
	methods: {
		onLocalesListChange() {
			if( !this.localesList.includes( this.locale ) ) {
				if( this.localesList.length > 0 )
					this.notifyValue( this.localesList[ 0 ] );
				else {
					this.notifyValue('en');
				}
			}
			else {
				this.notifyValue(this.locale );
			}
		},
		add: function() {
			let code = this.globalLocaleSelected;
			if( !this.localesList.includes( code ) ) {
				this.localesList.push( code );
			}
		},
		/* Notify to parent a value change */
		notifyValue: function ( value ) {
			this.$emit('set-locale', value );
			// this.$emit( 'input', value );
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
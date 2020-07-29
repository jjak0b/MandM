import {template} from "./I18nSelectorWidgetTemplate.js";
import {i18nList} from "./Translations.js";

export const component = {
	template: template,
	props: {
		"value": String
	},
	data(){
		return {
			localesList: {},
			globalLocalesList: i18nList,
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
	$.get("/shared/i18n/map")
		.then(map => {
			Object.keys(map)
				.forEach( (key, index) => {
					Vue.set( i18nList, key, map[ key ] );
				});
			console.log( "i18n list received:", i18nList );
			resolve( component );
		})
		.catch( (error) => console.error( "Error getting i18n map" ) );
};
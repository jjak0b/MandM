import {template} from "./I18nInputWidgetTemplate.js";
import {i18nContent, I18nString} from "./Translations.js";

export const component = {
	i18n: i18nContent,
	template: template,
	inheritAttrs: false,
	props: {
		"tag": String,
		"value": Object,
		"locale": String, /* current i18n */
		"localeLabel": String
	},
	data() {
		return {
			localeLabelKeys: null,
			endTargetLabel: null
		}
	},
	computed: {
		isDisabled: function() { return !this.locale || !this.localeLabel }
	},
	watch: {
		locale: function ( newLocale ) {
			if( this.localeLabel && !this.$i18n.te( this.localeLabel, newLocale ) ) {
				let obj = this.setContentOf( newLocale, this.localeLabel, "");
				console.warn( `Register for new locale '${ newLocale }', the label '${ this.localeLabel }'`, obj );
			}
		},
		localeLabel: function( newLabel ) {
			if( newLabel && !this.$i18n.te( newLabel, this.locale ) ) {
				let obj = this.setContentOf( this.locale, newLabel, "");
				console.warn( `Register for locale '${ this.locale }', new label '${ newLabel }'`, obj );
			}
		}
	},
	methods: {
		setContentOf( locale, label, value) {
			let obj = I18nString.buildObjectFromLabel( label, value );
			this.$i18n.mergeLocaleMessage( locale, obj );
			return obj;
		},
		/* Notify to parent a value change */
		notifyValue: function ( eventType, value ) {
			this.$emit( eventType, value );
			let obj = this.setContentOf( this.locale, this.localeLabel, value);
			// console.log( `Update for locale '${ this.locale }', the label '${ this.localeLabel }'`, obj );
		}
	}
};

export const asyncLoad = function ( resolve, reject ) {
	$.get( "locales/" ) // TODO: change this to other location
		.then((data) => {
			if( data ) {
				Object.keys( data ).forEach( locale => i18nContent.mergeLocaleMessage( locale, data[ locale ] ) );
				console.log( "Locales data received:", data );
				resolve( component );
			}
		})
		.catch( error => { console.error( "Error while getting localesData, continue offline ..."); resolve( component ) });
};


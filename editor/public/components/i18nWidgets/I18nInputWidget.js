import {template} from "./I18nInputWidgetTemplate.js";
import { i18n } from "../Translations.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";
import { component as i18nRegion } from "./I18nRegion.js";

export const component = {
	i18n: i18n,
	template: template,
	inheritAttrs: false,
	props: {
		"placeholder": String, // Note: this could be a placeholder html attribute, it's meaning is "a default value"
		"disabled": Boolean,
		"tag": String,
		"value": Object,
		"locale": String, /* current i18n */
		"localeLabel": String
	},
	components: {
		"i18n-region": i18nRegion
	},
	computed: {
		componentName: function() {
			switch( this.tag ) {
				case "input":
					return "b-form-input";
					break;
				case "textarea":
					return "b-form-textarea";
					break;
				default :
					return { props: { value: String }, template: "<label v-html='value'></label>" }
					break;
			}
		},
		isDisabled: function() { return this.disabled || !this.locale || !this.localeLabel }
	},
	watch: {
	/*	locale: function ( newLocale ) {
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
		}*/
	},
	methods: {
		setContentOf( locale, label, value) {
			let obj = I18nUtils.buildObjectFromLabel( label, value );
			this.$i18n.mergeLocaleMessage( locale, obj );
			return obj;
		},
		/* Notify to parent a value change */
		notifyValue: function ( eventType, value ) {
			this.$emit( eventType, value );
			let obj = this.setContentOf( this.locale, this.localeLabel, value);
			// console.log( `Update for locale '${ this.locale }', the label '${ this.localeLabel }'`, obj );
		},
		getContent(){
			if( this.isDisabled ){;
				return this.placeholder;
			}
			else if( !this.$i18n.te( this.localeLabel, this.locale ) ) {
				if( this.placeholder ) {
					let obj = this.setContentOf(this.locale, this.localeLabel, this.placeholder );
					console.warn("Register for new locale", this.locale, ", the label", this.localeLabel, ": ", obj);
				}
			}

			if( this.$i18n.te( this.localeLabel, this.locale) )
				return this.$i18n.t( this.localeLabel, this.locale );
			return ""
		}
	}
};

export const asyncLoad = function ( resolve, reject ) {
	$.get( "locales/" ) // TODO: change this to other location
		.then((data) => {
			if( data ) {
				Object.keys( data ).forEach( locale => component.i18n.mergeLocaleMessage( locale, data[ locale ] ) );
				console.log( "Locales data received:", data );
				resolve( component );
			}
		})
		.catch( error => { console.error( "Error while getting localesData, continue offline ..."); resolve( component ) });
};


import {template} from "./I18nInputWidgetTemplate.js";
import {localesData} from "./Translations.js";

export const component = {
	template: template,
	inheritAttrs: false,
	props: {
		"tag": String,
		"value": Object,
		"locale": String, /* current i18n */
		"localesData": Object,
		"localeLabel": String
	},
	data() {
		return {
			localeLabelKeys: null,
			endTargetLabel: null
		}
	},
	beforeMount: function() {
		if( !this.localesData ) this.localesData = {};

		this.localeLabelKeys = this.localeLabel.split('.');

		if( this.localeLabelKeys && this.localeLabelKeys.length > 0 )
			this.endTargetLabel = this.localeLabelKeys[ this.localeLabelKeys.length - 1 ];
	},
	computed: {
		localeDataRef: function () {
			this.localeLabelKeys = this.localeLabel.split('.');

			if( this.localeLabelKeys && this.localeLabelKeys.length > 0 )
				this.endTargetLabel = this.localeLabelKeys[ this.localeLabelKeys.length - 1 ];
			// console.log( "input-locale:", this.locale );
			// console.log( "input-data:", this.localesData );
			console.log(`tag '${this.tag}' Request to set content from`, this.localeLabel );
			if( this.locale ) {

				let b_shouldInit = false;
				let ref = null;
				let keys = this.localeLabelKeys;

				// iterate (and create) the object's hierarchy based on the provided label
				// if ( !this.localesData.hasOwnProperty( this.locale ) ) {
				// console.log( JSON.stringify( this.localesData ) );

				let hasKey = this.locale in this.localesData;
				// console.log( `? has key ${this.locale} in localesData`, hasKey );
				if ( !( this.locale in this.localesData ) ) {
					b_shouldInit = true;
					console.warn( `no locale '${ this.locale.toString() }' data found for  ${ this.localeLabel } -> create new object's hierarchy` );
					Vue.set(this.localesData, this.locale, {});
				}
				ref = this.localesData[this.locale];
				for (let i = 0; i < keys.length - 1; i++) {
					if( !( keys[i] in ref ) ) {
						console.warn( `no key '${ keys[i] }' data found for  ${ this.localeLabel } -> create new object's hierarchy` );
						Vue.set(ref, keys[i], {});
						b_shouldInit = true;
					}
					ref = ref[ keys[i] ];
				}
				if( !( keys[ keys.length-1 ] in ref ) ) {
					console.warn( `no key '${ keys[keys.length-1]  }' data found for  ${ this.localeLabel } -> Init empty` );
					Vue.set(ref, keys[keys.length - 1], "");
				}

				return ref;
			}
			console.warn( "empty data for", this.localeLabel );
			return {}; // just return a not null value
		}
	},
	methods: {
		/* Notify to parent a value change */
		notifyValue: function ( eventType, value ) {
			this.$emit( eventType, value );
		}
	}
};

export const asyncLoad = function ( resolve, reject ) {
	$.get( "locales/" ) // TODO: change this to other location
		.then((data) => {
			if( data ) {
				Object.keys( data ).forEach( locale => Vue.set( localesData, locale, data[ locale ] ) );
				console.log( "Locales data received:", localesData );
				resolve( component );
			}
		})
		.catch( error => { console.error( "Error while getting localesData, continue offline ..."); resolve( component ) });
};


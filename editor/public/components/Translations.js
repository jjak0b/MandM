// this instance translate editor's specific locale labels
export const i18n = new VueI18n({
	locale: navigator.language,
	fallbackLocale: 'en',
	messages: null
});
// silent warnings
i18n.silentTranslationWarn = true;
i18n.silentFallbackWarn = true;

$.get( "locales/"+navigator.language )
.then( (data) => {
	console.log( "Editor locales response ", data );
	if( data ) Object.keys( data ).forEach( locale => i18n.mergeLocaleMessage(locale, data[ locale ] ) );
});

export var i18nList = {}; // i18n codes and names
export const i18nContent = new VueI18n({
	locale: navigator.language,
	fallbackLocale: 'en',
	messages: {}
});
// silent warnings
i18nContent.silentTranslationWarn = true;
i18nContent.silentFallbackWarn = true;

/*
	Class used as String Substitute (but it's not a String), which will use the updated and localized String for a specified label
	Note: Only few methods are supported, this class is used for workarounds
*/
export class I18nString {
	constructor( i18n, label = "" ) {
		if( !i18n )
			console.error("not valid i18n for label:", label );
		// if we export this object, then i18n would be a complex object and it's not needed. Just get it from a function
		this.geti18n = () => i18n;
		this.label = label;
	}

	toString() {
		return I18nString.get( this.geti18n(), this.label );
	}
	toLowerCase(){
		return this.toString().toLowerCase();
	}
	toUpperCase(){
		return this.toString().toUpperCase();
	}
	static get( i18n, label ){
		return i18n.tc( label );
	}
	static buildObjectFromLabel( localeLabel, value ){
		let obj = {};
		let ref = obj;
		localeLabel.split('.').forEach( ( key, i, keys) => {
			ref = ref[ key ] = ( i == (keys.length-1) ? value : {} );
		});
		return obj;
	}
}

i18nContent.removeMessageAll = function ( key ){
	let empty = I18nString.buildObjectFromLabel( key, undefined );
	let self = this;
	console.warn( "[i18n content]", "removing locales message for", key );
	this.availableLocales.forEach( locale => self.mergeLocaleMessage( locale, empty ) );
}
// this instance translate editor's specific locale labels
import { I18nUtils } from "./I18nUtils.js";

export function getFallbackLanguages() {
	return navigator.languages || [ "en" ];
}

export const i18n = new VueI18n({
	locale: navigator.language,
	fallbackLocale: getFallbackLanguages(),
	messages: null
});
// silent warnings
i18n.silentTranslationWarn = true;
i18n.silentFallbackWarn = true;

/*
	Class used as String Substitute (but it's not a String), which will use the updated and localized String for a specified label
	Note: Only few methods are supported, this class is used for workarounds
*/

/**
 * Returns array of unique languages from browser preferences
 * @return {string[]}
 */
export function getLanguagesArraySet() {
	let array = [ navigator.language ];
	array = array.concat( getFallbackLanguages() );
	let set = new Set( array );
	return Array.from( set );
}

i18n.removeMessageAll = function ( key ){
	let empty = I18nUtils.buildObjectFromLabel( key, undefined );
	let self = this;
	// console.warn( "[i18n content]", "removing locales message for", key );
	this.availableLocales.forEach( locale => {
		if( self.te( key, locale ) ) {
			self.mergeLocaleMessage( locale, empty )
		}
	});
}
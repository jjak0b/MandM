// this instance translate editor's specific locale labels
import { I18nUtils } from "../../shared/js/I18nUtils.js";

export const i18n = new VueI18n({
	locale: navigator.language,
	fallbackLocale: 'en',
	messages: null
});
// silent warnings
i18n.silentTranslationWarn = true;
i18n.silentFallbackWarn = true;

/*
	Class used as String Substitute (but it's not a String), which will use the updated and localized String for a specified label
	Note: Only few methods are supported, this class is used for workarounds
*/

i18n.removeMessageAll = function ( key ){
	let empty = I18nUtils.buildObjectFromLabel( key, undefined );
	let self = this;
	console.warn( "[i18n content]", "removing locales message for", key );
	this.availableLocales.forEach( locale => self.mergeLocaleMessage( locale, empty ) );
}
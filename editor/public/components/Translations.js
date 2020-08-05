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
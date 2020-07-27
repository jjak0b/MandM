// this instance translate editor's specific locale labels
export const i18n = new VueI18n({
	locale: navigator.language,
	fallbackLocale: 'en',
	messages: null
});
$.get( "locales/"+navigator.language )
.then( (data) => {
	console.log( "locales response ", data );
	if( data ) Object.keys( data ).forEach( locale => i18n.mergeLocaleMessage(locale, data[ locale ] ) );
});
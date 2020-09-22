(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global.VueI18nImporter = factory());
}(this, (function () {
	'use strict';

	function fetchRemote( url ) {
		return new Promise( function (resolve, reject) {
			function keepRequestOnTimeout( url ){
				$.ajax( url, {
					error: function ( jqXHR, textStatus, errorThrown) {
						if( textStatus === "timeout") {
							console.error( "Timeout getting ", url, " ... Retry");
							keepRequestOnTimeout( url );
						}
						else{
							reject( errorThrown );
						}
					},
					success: resolve
				});
			}
			keepRequestOnTimeout( url );
		});
	}

	return function (Vue, options) {
		function getI18nRemote( i18n, locale) {
			if( i18n && i18n.src ) {
				var url = "";
				if( typeof i18n.src === "function") {
					i18n.src.bind( this );
					url = i18n.src();
				}
				if( url != null && url.length > 0) {

					if( url.includes( "?locale=" ) )
						url.replace("?locale=", "?locale=" + locale );
					else if( !url.endsWith("/") ) url += "/";
					url += locale;
				}

				fetchRemote( url )
					.then( function (data) {
						console.log( "Got", url, data );
						if( data ) Object.keys( data ).forEach( locale => i18n.mergeLocaleMessage(locale, data[ locale ] ) );
					})
					.catch( function ( errorThrown ) {
						console.error( "Failed getting ", url, errorThrown);
					});
			}
		}
		// 3. inject some component options
		Vue.mixin( {
			created() {
				console.log("created", this.$i18n );
				getI18nRemote(this.$i18n,  this.$i18n.locale );
				this.$watch('locale', function (locale) {
					getI18nRemote(this.$i18n, locale).bind( this );
					console.warn( "changed" );
				});
			}
		});
	};
})));
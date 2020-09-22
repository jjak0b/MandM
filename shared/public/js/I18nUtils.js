export class I18nUtils {
	static i18nCodes = {};

	constructor() {

	}
	static fetchCodes() {
		let self = this;
		return new Promise( function ( resolve, reject ) {
			if( Object.keys( self.i18nCodes ).length > 0 ) {
				resolve( self.i18nCodes );
			}
			else {
				$.get("/shared/i18n/map")
					.done(map => {
						Object.keys(map)
							.forEach( (key, index) => {
								Vue.set( self.i18nCodes, key, map[ key ] );
							});
						console.log( "i18n list received:", self.i18nCodes );
						resolve( self.i18nCodes );
					})
					.fail( (error) =>{
						console.error( "Error getting i18n map" )
						reject(error);
					});
			}
		});
	}
}
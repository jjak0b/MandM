export class I18nUtils {
	static i18nCodes = {};

	constructor() {

	}
	static buildObjectFromLabel( localeLabel, value ){
		let obj = {};
		let ref = obj;
		localeLabel.split('.').forEach( ( key, i, keys) => {
			ref = ref[ key ] = ( i == (keys.length-1) ? value : {} );
		});
		return obj;
	}

	static getRootMessages(i18n, rootField) {
		let data = {};
		i18n.availableLocales.forEach( (locale) => {
			if( i18n.messages[ locale ] && i18n.messages[ locale ][ rootField ] ){
				data[ locale ] = {};
				data[ locale ][ rootField ] = i18n.messages[ locale ][ rootField ];
			}
		});
		return data;
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

	static fetchLocales( rootPath = "./", locale ) {
		let self = this;
		if( !rootPath.endsWith("/") ) rootPath += "/";

		return new Promise( function (resolve, reject) {
			$.get( rootPath + "locales/" + (locale || "") )
				.then((data) => {
					if( data ) {
						console.log( "Locales data received:", data );
						resolve( data );
					}
				})
				.catch( error => {
					console.error( "Error while getting localesData, continue offline ...");
					reject();
				});
		});
	}
}

export class I18nString {
	constructor( i18n, label = "", locale ) {
		if( !i18n )
			console.error("not valid i18n for label:", label );
		// if we export this object, then i18n would be a complex object and it's not needed. Just get it from a function
		this.getI18n = () => i18n.tc( label, locale );
		this.label = label;
	}

	toString() {
		return this.getI18n();
	}
	toLowerCase(){
		return this.toString().toLowerCase();
	}
	toUpperCase(){
		return this.toString().toUpperCase();
	}
}
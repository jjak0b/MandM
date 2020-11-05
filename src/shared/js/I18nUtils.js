export class I18nUtils {
	static i18nCodes = languageMappingList;

	constructor() {

	}

	static getUniqueID() {
		return Date.now().toString();
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
		return new Promise( function ( resolve, reject ) {
			resolve( I18nUtils.i18nCodes );
		});
	}

	static fetchLocales( rootPath = "./", requestedLangOrLanguages ) {
		let self = this;
		if( !rootPath.endsWith("/") ) rootPath += "/";

		let shouldGetOnlyList = !requestedLangOrLanguages;
		let promiseListLanguages = null;

		if( !shouldGetOnlyList ) {
			if( Array.isArray( requestedLangOrLanguages ) ) {
				promiseListLanguages = Promise.resolve( requestedLangOrLanguages );
			}
			else if( requestedLangOrLanguages == "*" ) {
				promiseListLanguages = $.get( rootPath + "locales/" );
			}
			else {
				promiseListLanguages = Promise.resolve( [ requestedLangOrLanguages ] );
			}
		}
		else {
			promiseListLanguages = $.get( rootPath + "locales/" );
		}

		return new Promise( function (resolve, reject) {

			let promisesLocales = {};
			console.log( "Getting languages for locales in", rootPath );
			promiseListLanguages
			.then( languages => {
				languages.forEach( (lang) => promisesLocales[ lang ] = $.get( `${rootPath}locales/${lang}` ) );
				console.log( "Received language list for locales in", rootPath, languages );
				let promisesList = languages.map( (lang) => promisesLocales[ lang ] );
				if( shouldGetOnlyList ) {
					resolve( languages );
					return;
				}
				Promise.all( promisesList )
				.then((data) => {
					if( data ) {
						let locales = {};
						languages.forEach( (lang, i) => locales[ lang ] = data[ i ] )
						console.log( "Locales data received from", rootPath, locales );
						resolve( locales );
					}
				})
				.catch( error => {
					console.error( "Error while getting locales data, continue offline ...");
					reject( error);
				});
			})
			.catch( (error) => {
				console.error( "Error while getting list of locales, continue offline ...");
				reject( error );
			});
		});
	}
}

export class I18nString {
	constructor( i18n, label = "", i18nConfig = { method: "t", params: [ undefined, undefined ] } ) {
		if( !i18n )
			console.error("not valid i18n for label:", label );
		// if we export this object, then i18n would be a complex object and it's not needed. Just get it from a function
		this.getI18n = () => {
			let method = "t";
			let params = [ undefined, undefined ];

			if( i18nConfig.params ) {
				if( Array.isArray( i18nConfig.params ) ) {
					params = i18nConfig.params;
				}
				else if( "function" === typeof i18nConfig.params ) {
					params = i18nConfig.params();
				}
			}

			if( i18nConfig.method && i18nConfig.method in i18n ) {
				method = i18nConfig.method;
			}

			let translation = i18n[ method ]( label, params[ 0 ], params[ 1 ] ); //;method(label, params[ 0 ], params[ 1 ] );
			return translation;
		}
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
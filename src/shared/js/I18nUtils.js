export class I18nUtils {
	static i18nCodes = languageMappingList;

	constructor() {

	}

	static getUniqueID() {
		return performance.now().toString().replace('.', '');
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

		function reflect(promise){
			return promise.then(function(v){ return {v:v, status: "fulfilled" }},
				function(e){ return {e:e, status: "rejected" }});
		}

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
				languages.forEach( (lang) => promisesLocales[ lang ] = fetch( `${rootPath}locales/${lang}` ) );
				console.log( "Received language list for locales in", rootPath, languages );
				let promisesList = languages.map( (lang) => promisesLocales[ lang ] );
				if( shouldGetOnlyList ) {
					resolve( languages );
					return;
				}
				// dont't throw exceptions but resolve empty instead
				Promise.allSettled( promisesList )
				.then( results => {
					let languageResponses = {};

					let successResponsesCount = 0;
					let jsonPromises = results.map( (promise, i ) => {
						if( promise.status === "fulfilled" && promise.value.ok ){
							successResponsesCount++;
							return promise.value.json();
						}
						else {
							return Promise.reject( promise.value );
						}
					});


					if( successResponsesCount > 0 ){
						return Promise.allSettled( jsonPromises );
					}
					else{
						let rejected = results.map( result => result.status === "rejected" ? result.reason : result.value );
						return rejected.length > 0
							? Promise.reject( rejected[ 0 ].json() ) // rejected so return first cause
							: Promise.resolve( [] ); // no rejected found, so we received no data
					}
				})
				.then((results) => {

					if( results ) {
						let locales = {};
						languages.forEach( (lang, i) => {
							if( results[ i ].status === "fulfilled" && results[ i ].value ) {
								locales[ lang ] = results[ i ].value
							}
						});
						console.log( "Locales data received from", rootPath, locales );
						resolve( locales );
					}
				})
				.catch( error => {
					console.error( "Error while getting locales data", error );
					reject( error);
				});
			})
			.catch( (error) => {
				console.error( "Error while getting list of locales", error);
				reject( error );
			});
		});
	}

	static getValueFromLabel( messages, locale, label ) {
		let labelArray = label.split('.');
		let value = messages[locale];
		if (value) {
			for (const item of labelArray) {
				if (!value[item]) {
					return null
				}
				value = value[item]
			}
			return value
		}
	}

	/**
	 * Copy object structure of fromLocales that are in tupleList[ i ][ 0 ] to an object with the structures of merged tupleList[ i ][ 1 ]
	 * @param i18n
	 * @param localeMessages
	 * @param tupleList { String[][] }
	 */
	static copyOldLabelsToNewLabels( fromLocales, tupleList) {
		let value;

		let obj = {};
		for (const tuple of tupleList) {
			let fromLabel = tuple[ 0 ];
			let toLabel = tuple[ 1 ];

			for (const locale in fromLocales) {
				value = I18nUtils.getValueFromLabel(fromLocales, locale, fromLabel);
				if (value) {
					let msgObject = I18nUtils.buildObjectFromLabel(toLabel, value);
					if( locale in obj ) {
						I18nUtils.mergeDeep( obj[ locale ], msgObject );
					}
					else {
						obj[ locale ] = msgObject;
					}
				}
			}
		}
		return obj;
	}

	/**
	 * Deep merge two objects.
	 * @param target
	 * @param source
	 */
	static mergeDeep(target, source) {
		function isObject(item) {
			return (item && typeof item === 'object' && !Array.isArray(item));
		}

		if (!source) return target;


		if (isObject(target) && isObject(source)) {
			for (const key in source) {
				if (isObject(source[key])) {
					// insert empty object on the target at this key
					if (!target[key]) {
						let empty = {};empty[ key ] = {};
						Object.assign(target, empty );
					}
					// so merge them
					I18nUtils.mergeDeep(target[key], source[key]);
				}
				else {
					let endObj = {};endObj[ key ] = source[key];
					Object.assign(target, endObj);
				}
			}
		}
	}

	static setValueFromLabel( fromLocales, i18n, toLabel, fromLabel ) {
		let value;
		for (const locale in fromLocales) {
			value = I18nUtils.getValueFromLabel(fromLocales, locale, fromLabel);
			if (value) {
				let obj = I18nUtils.buildObjectFromLabel(toLabel, value);
				i18n.mergeLocaleMessage(locale, obj);
			}
		}
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
const path = require( 'path' );
const fs = require( 'fs' );
const Promise = require( 'promise');
const i18next = require("i18next");
const i18nextFs = require( "i18next-fs-backend");

class I18nHandler {
	constructor( basePath ) {
		this.localesDirname = "locales";
		this.pathLocales = path.join( basePath, this.localesDirname );

		const filenameExtension = ".json";
		let localesFilenames = [];

		let supportedLngs = [];
		if ( !fs.existsSync( this.pathLocales ) ){
			fs.mkdirSync( this.pathLocales );
		}
		else {
			localesFilenames = fs.readdirSync( this.pathLocales );
			if( localesFilenames ) {
				localesFilenames.filter((filename) => filename.endsWith(filenameExtension));
				supportedLngs = new Array(localesFilenames.length);
				localesFilenames.forEach(
					(filename, i) => supportedLngs[i] = filename.substring(0, filename.length - filenameExtension.length));
			}
		}
		console.log( "Detected languages in", this.pathLocales, supportedLngs );
		this.locales = supportedLngs;
		this.i18next = i18next.createInstance();
		this.i18next.use( i18nextFs );
		this.i18next.init({
			// debug: true,
			lng: 'en',
			// fallbackLng: ["en"], // frontend handle localization codes
			backend: {
				loadPath: path.join( this.pathLocales, "{{lng}}.json" )
			}
		});

	}


	getI18nCodeList() {
		return this.locales;
	}

	getJSON( langCode ) {
		return new Promise( (resolve, reject) => {
			this.i18next.changeLanguage( langCode )
				.finally( () => {
					let data = null;
					for (let i = 0; i < this.i18next.languages.length; i++) {
						data = this.i18next.getResourceBundle( this.i18next.languages[i] );
						if( data ) break;
					}
					if( data ) {
						resolve( data );
					}
					else {
						console.error("[I18nHandler]", "Unable to find any locales for", langCode, "in path:", this.pathLocales );
						reject( null );
					}
				});
		});
	}

	addJSON( langCode, data ) {
		return new Promise( (resolve, reject) => {
			fs.writeFile(
				path.join(this.pathLocales, `${langCode}.json`),
				JSON.stringify(data),
				'utf8',
				(err) => {
					if (err) {
						reject( err );
					}
					else {
						if( !this.locales.includes( langCode ) ) {
							console.log( "[I18nHandler]", "Register new locales for", langCode );
							this.locales.push( langCode );
						}
						else {
							console.log( "[I18nHandler]", "Update locales for", langCode );
						}
						this.i18next.reloadResources( langCode );

						resolve();
					}
				});
		});
	}

};

/***
 * @Brief filter all locales array and return the locales as more detailed as possible for the requested locale
 * @param locales
 * @param localeReq
 * @returns filtered locales
 */
function filterLocale( locales, localeReq ) {
	// costruisco la gerarchia dei locals
	let locals = localeReq.split('-');
	let localesFiltered = locales;
	console.log( "locale request separated: ", locals );
	// check if there is a match an all locales
	for( let i = 0; i < locales.length; i++ ) {
		if (locales[i] == localeReq) {

			localesFiltered = [];
			localesFiltered[0] = locales[i];
			console.log( "found directly locale", localesFiltered );
			return localesFiltered;
		}
	}
	console.log( "searching locales candidates for", localeReq );

	let start = 0,
		end = 0;
	let filteredDetailed = []; // will contains locales of more detailed locales (in ascendant order )
	// fiter and order from least to most specific locale
	locals.forEach( (local, i) => {
		end = start + local.length;
		localesFiltered = localesFiltered.filter( locale => local === "*" || ( locale.length > 0 && locale.substring(start, end) === local) );
		start = end + 1; // + 1 to start from next char after '-'
		filteredDetailed.push( localesFiltered );
	});

	for( let i = filteredDetailed.length-1; i >= 0; i-- ) {
		if( filteredDetailed[i].length > 0 ){
			localesFiltered = filteredDetailed[i];
			console.log( "found candidates", localesFiltered);
			break;
		}
	}
	return localesFiltered;
}

module.exports = {
	I18nHandler
};
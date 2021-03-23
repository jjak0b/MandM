const express = require('express');
const path = require('path');
const I18nHandler = require( '../js/I18nHandler').I18nHandler;

const StatusCodes = require("http-status-codes").StatusCodes;

// router.get('/i18n/map', function(req, res) { res.json( locales.i18n ) } );
// router.get('/*/', express.static(path.join(__basedir, '/shared/static')));
// router.get('/i18n/codes', function(req, res) { res.json( Object.keys( locales.i18n ) ); });
// router.get('/i18n/map', function(req, res) { res.json( locales.i18n ) } );


function API_GET_I18nCodeList( req, res) {

	let handler = res.locals.locales.handler;
	handler.getI18nCodeList()
.then( (i18nList) => {
	if( i18nList ) {
		res.json( i18nList );
	}
	else {
		res.sendStatus( StatusCodes.NOT_FOUND );
	}
})
.catch( () => {
	res.sendStatus( StatusCodes.NOT_FOUND );
})

}

function API_GET_Locale( req, res) {
	let lang = req.params.i18nCode;
	let handler = res.locals.locales.handler;

	if( lang ) {
		handler.getJSON( lang )
			.then( (data) => {
				res.json( data );
			})
			.catch( (error) => {
				console.error( error );
				res.sendStatus( StatusCodes.NOT_FOUND );

			})
	}
	else {
		res.sendStatus( StatusCodes.NOT_FOUND );
	}
}

function API_PUT_Locale(req, res ) {
	let lang = req.params.i18nCode;
	let jsonData = req.body;

	let handler = res.locals.locales.handler;
	if( lang && jsonData ) {
		handler.addJSON( lang, jsonData )
			.then( () => {
				res.sendStatus( StatusCodes.CREATED );
			})
			.catch( (error) => {
				switch ( error.errno ) {
					case error.ENOSPC:
						res.sendStatus( StatusCodes.INSUFFICIENT_STORAGE );
						break;
					default:
						res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
						break;
				}
			});
	}
	else {
		res.sendStatus( StatusCodes.BAD_REQUEST );
	}
}

function middleware( staticPath ) {
	let router = express.Router();

	let handler = staticPath ? new I18nHandler( staticPath ) : null;

	function initHandler(req, res, next) {
		let path = res.locals.locales && res.locals.locales.path ? res.locals.locales.path : staticPath;
		if( path ) {
			if( !res.locals.locales ) {
				res.locals.locales = {};
			}
			res.locals.locales.handler = handler || new I18nHandler( path );

			res.locals.locales.handler
				.onInit()
				.then( () => {
					next();
				})
				.catch( () => {
					next();
				})
		}
		else {
			console.error( "[api/locales]", "locales path has not been set to serve:", req.path );
			res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
		}
	}

	router.all( "/*", initHandler );

	router.get("/", API_GET_I18nCodeList );

	router.get("/:i18nCode", API_GET_Locale );

	router.put("/:i18nCode", API_PUT_Locale );


	return router;
}

module.exports = middleware;
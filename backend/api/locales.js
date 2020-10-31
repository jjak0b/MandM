const express = require('express');
const path = require('path');
const I18nHandler = require( '../js/I18nHandler').I18nHandler;
let router = express.Router();
const StatusCodes = require("http-status-codes").StatusCodes;

// router.get('/i18n/map', function(req, res) { res.json( locales.i18n ) } );
// router.get('/*/', express.static(path.join(__basedir, '/shared/public')));
// router.get('/i18n/codes', function(req, res) { res.json( Object.keys( locales.i18n ) ); });
// router.get('/i18n/map', function(req, res) { res.json( locales.i18n ) } );


function API_GET_I18nCodeList( req, res) {

	res.write("Hello");
	res.end();
	// let i18nList = handler.getI18nCodeList();
	// res.json( i18nList );
}

function API_GET_Locale( req, res) {
	let lang = req.params.i18nCode;
	let handler = res.locals.locales.handler;

	if( lang && handler.isAvailable( lang ) ) {
		handler.getJSON( lang )
			.then( (data) => {

			})
			.catch( (error) => {
				switch ( error.errno ) {
					case error.ENOENT:
						res.sendStatus( StatusCodes.INSUFFICIENT_STORAGE );
						break;
					case error.ENOSPC:
						res.sendStatus
				}

			})
	}
	else {
		res.sendStatus( StatusCodes.NOT_FOUND );
	}
}

function API_PUT_Locale(req, res ) {
	let lang = req.params.i18nCode;
	let jsonData = req.body;

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

function initHandler(req, res, next) {
	let path = res.locals.locales && res.locals.locales.path ? res.locals.locales.path : null;
	if( path ) {
		res.locals.locales.handler = new I18nHandler( path );
		next();
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

module.exports = router;
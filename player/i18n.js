const express = require('express');
const path = require('path');
const router = express.Router();
const Promise = require( 'promise');
const Locales = require( '../shared/js/locales');

/* GET locales listing. */
router.get('/', ( req, res ) => Locales.setLocalesResponse( res, null, __dirname ) );

/* GET single locale*/
router.get('/:locale', ( req, res ) => Locales.setLocalesResponse( res, req.params.locale, __dirname ) );

module.exports = router;
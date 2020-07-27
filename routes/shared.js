const express = require('express');
const path = require('path');
const router = express.Router();
const locales = require( '../shared/js/locales');


router.get('/', express.static(path.join(__basedir, '/shared')));
router.get('/i18n/codes', function(req, res) { res.json( Object.keys( locales.i18n ) ); });
router.get('/i18n/map', function(req, res) { res.json( locales.i18n ) } );

module.exports = router;
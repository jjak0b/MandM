var express = require('express');
var path = require('path');
var router = express.Router();
var app = require( '../app' );

app.use( '/qr-scanner', express.static(path.join(__basedir, 'qr-scanner')) );
module.exports = router;

var express = require('express');
var path = require('path');
var router = express.Router();
var app = require( '../app' );

app.use( '/shared', express.static(path.join(__basedir, '/shared' )) );
module.exports = router;

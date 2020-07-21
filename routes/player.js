var express = require('express');
var path = require('path');
var router = express.Router();
var app = require( '../app' );

app.use( '/player', express.static(path.join(__basedir, '/player/public' )) );
module.exports = router;

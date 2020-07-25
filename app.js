var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
global.__basedir = __dirname;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;

/* each route set its own public folder  */
app.use(
    '/player',
    require('./routes/player')
);
app.use(
	'/editor',
	require('./routes/editor')
);
app.use(
    '/qr-scanner',
    require('./routes/qr-scanner')
);
app.use(
	'/shared/*',
	require('./routes/shared')
);

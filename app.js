global.__basedir = __dirname;

const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
// We can receive big buffers
app.use(express.json({
	limit: "200MB"
}));
app.use(express.urlencoded({ extended: false }));

/* Dedicate a router to each top-level base path. */
app.use('/evaluator', require('./backend/routes/evaluator'));
app.use('/player', require('./backend/routes/player'));
app.use('/editor', require('./backend/routes/editor'));
app.use('/scan', require('./backend/routes/qr-scanner'));
app.use('/shared', require( './backend/routes/shared' ));
app.use( '/stories', require('./backend/api/stories').router);
app.use( '/libs', require('./backend/routes/libs'));
app.use( '/assets', require('./backend/api/assets').router);
app.use('/bundles', express.static(path.join(global.__basedir, 'bundles' )));
app.use( '/', express.static(path.join(global.__basedir, "src" ) ) );

module.exports = app;
global.__basedir = __dirname;

const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Dedicate a router to each top-level base path. */
app.use('/player', require('./backend/routes/player'));
app.use('/editor', require('./backend/routes/editor'));
app.use('/scan', require('./backend/routes/qr-scanner'));
app.use('/shared', require( './backend/routes/shared' ));
app.use( '/stories', require('./backend/api/stories').router);
app.use( '/libs', require('./backend/routes/libs'));
app.use( '/assets', require('./backend/api/assets').router);
app.use('/bundles', express.static(path.join(__basedir, '/bundles' )));
module.exports = app;
global.__basedir = __dirname;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Dedicate a router to each top-level base path. */
app.use('/play', require('./backend/routes/player'));
app.use('/edit', require('./backend/routes/editor'));
app.use('/scan', require('./backend/routes/qr-scanner'));
app.use('/shared', express.static( path.join(__basedir, '/shared/public')) );
app.use( '/stories', require('./backend/api/stories').router);
app.use( '/libs', require('./backend/routes/libs'));
app.use( '/assets', require('./backend/api/assets').router);
app.use('/bundles', express.static(path.join(__basedir, '/bundles' )));
module.exports = app;
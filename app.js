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
app.use('/play', require('./routes/player'));
app.use('/edit', require('./routes/editor'));
app.use('/scan', require('./routes/qr-scanner'));
app.use('/shared', require('./routes/shared'));
app.use( '/libs', require('./routes/libs'));
module.exports = app;
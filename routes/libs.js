const express = require('express');
const path = require('path');
const router = express.Router();

router.use( '/datalist-polyfill', express.static(path.join(__basedir, '/node_modules/datalist-polyfill' )) );

module.exports = router;

const express = require('express');
const path = require('path');
const router = express.Router();

router.use( '/datalist-polyfill', express.static(path.join(__basedir, '/node_modules/datalist-polyfill' )) );
router.use( '/vue-accessible-color-picker', express.static(path.join(__basedir, '/node_modules/vue-accessible-color-picker/dist' )) );

module.exports = router;

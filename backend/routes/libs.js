const express = require('express');
const path = require('path');
const router = express.Router();
let nodeModulesPath = path.join(__basedir, 'node_modules' );

router.use( '/datalist-polyfill', express.static(path.join( nodeModulesPath, 'datalist-polyfill' )) );
router.use( '/vue-accessible-color-picker', express.static( path.join( nodeModulesPath, 'vue-accessible-color-picker', 'dist' )) );
router.use( '/vue-qrcode', express.static(path.join( nodeModulesPath, '@chenfengyuan', 'vue-qrcode', 'dist' )) );

module.exports = router;

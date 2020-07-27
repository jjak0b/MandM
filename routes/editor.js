var express = require('express');
var path = require('path');
var router = express.Router();


router.get( '/*', express.static(path.join(__basedir, '/editor/public' )) );
module.exports = router;

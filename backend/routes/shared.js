const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/locales',
	// first provide to middleware the path it needs
	require("../api/locales" )( path.join(global.__basedir, "src", "shared" ) )
);

router.use('/', express.static(path.join(global.__basedir, "src", "shared" ) ) );

module.exports = router;

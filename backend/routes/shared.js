const express = require('express');
const path = require('path');
const router = express.Router();
/*
// this should be used for shared locales
router.use('/locales',
	// first provide to middleware the path it needs
	(req, res, next) => {
		res.locals.locales = { path: path.join(__basedir, "src", "shared" ) }
		next();
	},
	require("../api/locales" )
);
*/

router.get( '/*', express.static(path.join(__basedir, "src", "shared" ) ) );

module.exports = router;

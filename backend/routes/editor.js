const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/locales',
	// first provide to middleware the path it needs
	(req, res, next) => {
		res.locals.locales = { path: path.join(__basedir, "src", "editor" ) }
		next();
	},
	require("../api/locales" )
);

router.get( '/*', express.static(path.join(__basedir, "src", "editor" ) ) );

module.exports = router;

const express = require('express');
const path = require('path');
const router = express.Router();

router.get( '/*', express.static(path.join(__basedir, '/editor/public' )) );

router.use('/locales',
	// first provide to middleware the path it needs
	(req, res, next) => {
		res.locals.locales = { path: path.join(__basedir, '/editor' ) }
		next();
	},
	require("../api/locales" )
);


module.exports = router;

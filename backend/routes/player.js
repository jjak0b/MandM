const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', express.static(path.join(__basedir, "src", "player" ) ) );

router.use('/locales',
	// first provide to middleware the path it needs
	(req, res, next) => {
		res.locals.locales = { path: path.join(__basedir, "src", "player" ) }
		next();
	},
	require("../api/locales" )
);

module.exports = router;
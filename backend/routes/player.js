const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', express.static(path.join(__basedir, '/player/public')));

router.use('/locales',
	// first provide to middleware the path it needs
	(req, res, next) => {
		res.locals.locales = { path: path.join(__basedir, '/player' ) }
		next();
	},
	require("../api/locales" )
);

module.exports = router;
const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/locales',
	// first provide to middleware the path it needs
	require("../api/locales" )( path.join(__basedir, "src", "player" ) )
);

router.get('/*', express.static(path.join(__basedir, "src", "player" ) ) );
module.exports = router;
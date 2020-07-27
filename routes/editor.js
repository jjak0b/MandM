const express = require('express');
const path = require('path');
const router = express.Router();

router.get( '/*', express.static(path.join(__basedir, '/editor/public' )) );

router.use('/locales', require('../editor/i18n') );

module.exports = router;

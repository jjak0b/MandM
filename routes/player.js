const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', express.static(path.join(__basedir, '/player/public')));

router.use('/locales', require('../player/i18n') );

module.exports = router;
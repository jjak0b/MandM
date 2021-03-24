const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/', express.static(path.join(global.__basedir, 'qr-scanner')));

module.exports = router;
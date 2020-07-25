const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', express.static(path.join(__basedir, '/shared')));

module.exports = router;
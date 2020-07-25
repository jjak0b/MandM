const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', express.static(path.join(__basedir, '/player/public')));

module.exports = router;
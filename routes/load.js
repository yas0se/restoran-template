const express = require('express');
const router = express.Router();

const loadController = require('../controller/load');

router.get('/', loadController.load);
module.exports = router;
const express = require('express');
const router = express.Router();

const aboutLoadController = require('../controller/aboutLoad');

router.get("/", aboutLoadController.aboutLoad);
module.exports = router;
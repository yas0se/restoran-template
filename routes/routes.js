const express = require('express');
const router = express.Router();

const newsletterController = require('../controller/mail')

router.post('/newsletters', newsletterController.create);

module.exports = router;
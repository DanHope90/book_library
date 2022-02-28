const express = require('express');

const readerController = require('../controllers/reader');

const router = express.Router();

router.route('/').post(readerController.createReader);

module.exports = router; 
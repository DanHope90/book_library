const express = require('express');

const bookController = require('../controllers/book');

const router = express.Router();

router.get('/:bookId', bookController.findBook);

module.exports = router;

const express = require('express');

const bookController = require('../controllers/book');

const router = express.Router();

router.post('/', bookController.createBook);

router.get('/', bookController.getBooks);

router.get('/:bookId', bookController.getBookId);

router.patch('/:bookid', bookController.updateBook);

module.exports = router;

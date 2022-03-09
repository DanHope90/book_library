const express = require('express');

const authorController = require('../controllers/author');

const router = express.Router();

router.post('/', authorController.createAuthor);

router.get('/', authorController.getAuthors);

router.get('/:authorId', authorController.getAuthorById);

router.patch('/:authorId', authorController.updateAuthor);

router.delete('/:authorId', authorController.deleteAuthor);

module.exports = router;

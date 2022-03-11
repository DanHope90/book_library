const express = require('express');

const authorController = require('../controllers/author');

const router = express.Router();

router.post('/', authorController.createAuthor);

router.get('/', authorController.getAuthors);

router.get('/:id', authorController.getAuthorById);

router.patch('/:id', authorController.updateAuthor);

router.delete('/:id', authorController.deleteAuthor);

module.exports = router;

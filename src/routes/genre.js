const express = require('express');

const genreController = require('../controllers/genre');

const router = express.Router();

router.post('/', genreController.createGenre);

router.get('/', genreController.getGenres);

router.get('/:id', genreController.getGenreById);

router.patch('/:id', genreController.updateGenre);

router.delete('/:id', genreController.deletedGenre);

module.exports = router;

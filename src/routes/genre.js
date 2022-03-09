const express = require('express');

const genreController = require('../controllers/genre');

const router = express.Router();

router.post('/', genreController.createGenre);

router.get('/', genreController.getGenres);

router.get('/:genreId', genreController.getGenreById);

router.patch('/:genreId', genreController.updateGenre);

router.delete('/:genreId', genreController.deletedGenre);

module.exports = router;

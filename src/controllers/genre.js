/* eslint-disable indent */
const { Genre } = require('../models');
const { createItem, getAllItems } = require('./helper');

const createGenre = (req, res) => createItem(res, 'genre', req.body);

const getGenres = (req, res) => getAllItems(res, 'genre');

const getGenreById = async (req, res) => {
    const { genreId } = req.params;
    const genre = await Genre.findByPk(genreId);

    if (!genre) {
      res.status(404).json({ error: 'The genre could not be found.' });
    } else {
      res.status(200).json(genre);
    }
  };

  const updateGenre = async (req, res) => {
    const { genreId } = req.params;
    const updateData = req.body;
    const [updateRows] = await Genre.update(updateData, { where: { id: genreId } });
  
    if (!updateRows) {
      res.status(404).json({ error: 'The genre could not be found.' });
    } else {
      res.status(200).json();
    }
  };

  const deletedGenre = async (req, res) => {
    const { genreId } = req.params;
    const deletedRows = await Genre.destroy({ where: { id: genreId } });
  
    if (!deletedRows) {
      res.status(404).json({ error: 'The genre could not be found.' });
    } else {
      res.status(204).json();
    }
  };

module.exports = { createGenre, getGenres, getGenreById, updateGenre, deletedGenre };

/* eslint-disable indent */
const { Genre } = require('../models');
const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('./helper');

const createGenre = (req, res) => createItem(res, 'genre', req.body);

const getGenres = (req, res) => getAllItems(res, 'genre');

const getGenreById = (req, res) => getItemById(res, 'genre', req.params.id);

const updateGenre = (req, res) => updateItem(res, 'genre', req.body, req.params.id);

const deletedGenre = (req, res) => deleteItem(res, 'genre', req.params.id);

module.exports = { createGenre, getGenres, getGenreById, updateGenre, deletedGenre };

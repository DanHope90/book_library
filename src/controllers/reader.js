const { Reader } = require('../models');
const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('./helper');

const createReader = (req, res) => createItem(res, 'reader', req.body);

const getReaders = (req, res) => getAllItems(res, 'reader');

const getReaderById = (req, res) => getItemById(res, 'reader', req.params.id);

const updateReader = (req, res) => updateItem(res, 'reader', req.body, req.params.id)

const deleteReader = (req, res) => deleteItem(res, 'reader', req.params.id);

module.exports = { createReader, getReaders, getReaderById, updateReader, deleteReader };

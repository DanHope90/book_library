const { Reader } = require('../models');
const { createItem, getAllItems, deleteItem } = require('./helper');

const createReader = (req, res) => createItem(res, 'reader', req.body);

const getReaders = (req, res) => getAllItems(res, 'reader');

//const updateReader = (req, res) => updateItem(res, 'reader', req.body, req.params.id

//const deleteReader = (req, res) => deleteItem(res, 'reader', req.body, req.params);

const findByPk = async (req, res) => {
  const { readerId } = req.params;
  const reader = await Reader.findByPk(readerId);

  if (!reader) {
    res.status(404).json({ error: 'The reader could not be found.' });
  } else {
    res.status(200).json(reader);
  }
};

const updateReader = async (req, res) => {
  const { readerId } = req.params;
  const updateData = req.body;
  const [updateRows] = await Reader.update(updateData, { where: { id: readerId } });

  if (!updateRows) {
    res.status(404).json({ error: 'The reader could not be found.' });
  } else {
    res.status(200).json();
  }
};

const deleteReader = async (req, res) => {
  const { readerId } = req.params;
  const deletedRows = await Reader.destroy({ where: { id: readerId } });

  if (!deletedRows) {
    res.status(404).json({ error: 'The reader could not be found.' });
  } else {
    res.status(204).json();
  }
};

module.exports = { createReader, getReaders, findByPk, updateReader, deleteReader };

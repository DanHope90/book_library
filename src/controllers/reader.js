const { Reader } = require('../models');

const createReader = async (req, res) => {
  const data = req.body;

  try {
    const newReader = await Reader.create(data);
    res.status(201).json(newReader);
  } catch (err) {
    res.sendStatus(500).json(err);
  }
};

const findReader = async (req, res) => {
  const readers = await Reader.findAll(req.body);
  res.status(200).json(readers);
};

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

module.exports = { createReader, findReader, findByPk, updateReader, deleteReader };

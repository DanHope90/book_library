/* eslint-disable indent */
const { Author } = require('../models');
const { createItem, getAllItems } = require('./helper');

const createAuthor = (req, res) => createItem(res, 'author', req.body);

const getAuthors = (req, res) => getAllItems(res, 'author');

const getAuthorById = async (req, res) => {
    const { authorId } = req.params;
    const author = await Author.findByPk(authorId);

    if (!author) {
      res.status(404).json({ error: 'The author could not be found.' });
    } else {
      res.status(200).json(author);
    }
  };

  const updateAuthor = async (req, res) => {
    const { authorId } = req.params;
    const updateData = req.body;
    const [updateRows] = await Author.update(updateData, { where: { id: authorId } });
  
    if (!updateRows) {
      res.status(404).json({ error: 'The author could not be found.' });
    } else {
      res.status(200).json();
    }
  };

  const deleteAuthor = async (req, res) => {
    const { authorId } = req.params;
    const deletedRows = await Author.destroy({ where: { id: authorId } });
  
    if (!deletedRows) {
      res.status(404).json({ error: 'The author could not be found.' });
    } else {
      res.status(204).json();
    }
  };

module.exports = { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor };

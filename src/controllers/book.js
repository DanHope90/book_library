const { Book, Reader } = require('../models');
const { createItem, getAllItems } = require('./helper');

const createBook = (req, res) => createItem(res, 'book', req.body);

const getBooks = (req, res) => getAllItems(res, 'book');

const getBookId = async (req, res) => {
  const { bookId } = req.params;

  try {
    const bookTitle = await Book.findByPk(bookId);
    if (!bookTitle) {
      res.status(404).json({ error: 'The book could not be found.' });
    } else {
      res.status(200).json(bookTitle);
    }
  } catch (err) {
    res.status(500);
  }
};

const updateBook = async (req, res) => {
  const { bookId } = req.params;
  //console.log(bookId);
  const updatedData = req.body;
  //console.log(updatedData);
  const [updatedRows] = await Book.update(updatedData, { where: { id: bookId } });
  //console.log(updatedRows);
  if (!updatedRows) {
    res.status(404).json({ error: 'The book could not be found.' });
  } else {
    res.status(200).json();
  }
};

const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  const deletedRows = await Book.destroy({ where: { id: bookId } });

  if (!deletedRows) {
    res.status(404).json({ error: 'The book could not be found.' });
  } else {
    res.status(204).json();
  }
};


module.exports = { getBooks, createBook, getBookId, updateBook, deleteBook };

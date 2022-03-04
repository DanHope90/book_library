const { Book, Reader } = require('../models');

const createBook = async (req, res) => {
  const data = req.body;

  try {
    const newBook = await Book.create(data);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getBooks = async (req, res) => {
  Book.findAll().then((books) => {
    res.status(200).json(books);
  });
};

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
  const { bookId } = req.params.id;
  const updatedData = req.body;
  const [updatedRows] = await Book.update(updatedData, { where: { id: bookId } });

  if (!updatedRows) {
    res.status(404).json({ error: 'The book could not be found.' });
  } else {
    res.status(200).json();
  }
};

module.exports = { getBooks, createBook, getBookId, updateBook };

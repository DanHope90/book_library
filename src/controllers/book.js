const express = require('express');
const { Book } = require('../models');

const findBook = async (req, res) => {
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

module.exports = { findBook };

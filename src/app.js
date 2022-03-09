const express = require('express');

const readerRouter = require('./routes/reader');
const bookRouter = require('./routes/book');
const authorRouter = require('./routes/author');
const genreRouter = require('./routes/genre');

const app = express();

app.use(express.json());

app.use('/readers', readerRouter);

app.use('/book', bookRouter);

app.use('/authors', authorRouter);

app.use('/genres', genreRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;

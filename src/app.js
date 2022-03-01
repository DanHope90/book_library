const express = require('express'); 

const app = express();

const readerRouter = require('./routes/reader')

app.use(express.json());

app.use('/readers', readerRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;

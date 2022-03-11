const express = require('express');

const readerController = require('../controllers/reader');

const router = express.Router();

router.post('/', readerController.createReader);

router.get('/', readerController.getReaders);

router.get('/:id', readerController.getReaderById);

router.patch('/:id', readerController.updateReader);

router.delete('/:id', readerController.deleteReader);

module.exports = router;

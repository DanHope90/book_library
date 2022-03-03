const express = require('express');

const readerController = require('../controllers/reader');

const router = express.Router();

router.post('/', readerController.createReader);

router.get('/', readerController.findReader);

router.get('/:readerId', readerController.findByPk);

router.patch('/:readerId', readerController.updateReader);

router.delete('/:readerId', readerController.deleteReader);

module.exports = router;

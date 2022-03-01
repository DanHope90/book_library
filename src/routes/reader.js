const express = require('express');

const readerController = require('../controllers/reader');

const router = express.Router();

router.route('/').post(readerController.createReader);

router.route('/').get(readerController.findReader);

router.route('/:readerId').get(readerController.findByPk);

router.route('/:readerId').patch(readerController.updateReader);

router.route('/:readerId').delete(readerController.deleteReader);

module.exports = router;

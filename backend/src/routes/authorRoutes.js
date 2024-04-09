const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router.get('/top-authors', authorController.getTopAuthors);

module.exports = router;
const express = require('express');
const setupController = require('../controllers/setupController');

const router = express.Router();

// Endpoint for setup
router.get('/', setupController.setupDatabase);

module.exports = router;

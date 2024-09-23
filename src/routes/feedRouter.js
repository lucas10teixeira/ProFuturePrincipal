const express = require('express');
const router = express.Router();
const { storefeed } = require('../controller/feedController');

// Rota para criar um novo post no feed
router.post('/store/feed', storefeed);

module.exports = router;

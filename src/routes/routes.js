const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.get('/user/:id', profileController.getUserProfile);
router.put('/updateUserProfile/:id', profileController.updateUserProfile);

module.exports = router;

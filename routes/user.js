const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup', userController.signUp);

router.post('/login', userController.postLogin);

module.exports = router;

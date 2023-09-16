const express = require('express');
const { register } = require('../controllers/UserController');
const { login } = require('../controllers/UserController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

module.exports = router;
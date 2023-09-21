const express = require('express');
const { register } = require('../controllers/UserController');
const { login } = require('../controllers/UserController');

// import Auth from '../middleware/auth';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

module.exports = router;
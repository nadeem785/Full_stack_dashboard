const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { getUsers } = require('../controllers/usersController');

router.get('/', authenticateToken, getUsers);

module.exports = router;


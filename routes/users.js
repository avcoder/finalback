const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

/* GET users listing. */
router.get('/', authController.isLoggedIn, userController.getUsers);

module.exports = router;

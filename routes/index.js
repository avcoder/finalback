const express = require('express');
const gameController = require('../controllers/gamesController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

/* GET home page. */
router.get('/', gameController.homePage);

router.get('/games', gameController.getGames);
// router.get('/filldata', authController.isLoggedIn, gameController.fillData);
router.get('/filldata', gameController.fillData);
router.get('/playgame', authController.isLoggedIn, gameController.play);

router.get('/admin', authController.isLoggedIn, gameController.admin);
router.get('/admin/delete/:id', gameController.deleteGame);
router.get('/admin/edit/:id', gameController.editGame);
router.post('/admin/edit/:id', gameController.updateGame);

router.get('/add', authController.isLoggedIn, gameController.addGame);
// router.post('/add', authController.isLoggedIn, gameController.createGame);
router.post('/add', gameController.createGame);

router.get('/register', userController.registerForm);
router.post('/register', userController.register, authController.login);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/games');
});

module.exports = router;

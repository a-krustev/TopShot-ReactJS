const router = require('express').Router();
const users = require('./users');
const categories = require('./categories');
const contests = require('./contests');
const likes = require('./likes');
const test = require('./test');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/categories', categories);
router.use('/contest', contests);
router.use('/likes', likes);
router.use('/test', test);

module.exports = router;

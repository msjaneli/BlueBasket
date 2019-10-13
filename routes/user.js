const Router = require('express-promise-router');
const router = new Router();

var userController = require('../controllers/userController');

module.exports = router;

router.post('/register', userController.registerUser);

router.post('/check-exists', userController.checkUserExists);

router.post('/register-facebook-user', userController.registerFacebookUser);
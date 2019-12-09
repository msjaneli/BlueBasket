const Router = require('express-promise-router');
const router = new Router();

var userController = require('../controllers/userController');

module.exports = router;

router.get('/:uid', userController.getUserById);

router.get('/:email/uid', userController.getId);

router.post('/register', userController.register);

router.post('/check-exists', userController.checkUserExists);

router.post('/register-facebook-user', userController.registerFacebookUser);

router.post('/login', userController.login);
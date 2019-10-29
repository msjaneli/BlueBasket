const Router = require('express-promise-router');
const router = new Router();

var restaurantController = require('../controllers/restaurantController');

module.exports = router;

router.post('/register', restaurantController.register);

router.post('/login', restaurantController.login)
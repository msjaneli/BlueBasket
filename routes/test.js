const Router = require('express-promise-router')
const router = new Router();

var user_controller = require('../controllers/userController');

module.exports = router;

router.get('/', user_controller.user_list);
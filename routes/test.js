const Router = require('express-promise-router')
const router = new Router();

var userController = require('../controllers/userController');

module.exports = router;

router.get('/', userController.getUsers);
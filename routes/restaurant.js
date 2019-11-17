const Router = require('express-promise-router');
const router = new Router();

var restaurantController = require('../controllers/restaurantController');

module.exports = router;

router.get('/', restaurantController.getRestaurants);

router.get('/available-now', restaurantController.getRestaurantsAvailableNow);

router.get('/available-later', restaurantController.getRestaurantsAvailableLater);

router.get('/:rid/stripe-account', restaurantController.getStripeAccountByRid);

router.get('/:rid', restaurantController.getRestaurantById);

router.post('/:rid/image/update', restaurantController.updateImage);

router.post('/register', restaurantController.register);

router.post('/login', restaurantController.login);


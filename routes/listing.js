const Router = require('express-promise-router');
const router = new Router();

var listingController = require('../controllers/listingController');

module.exports = router;

router.get('/:rid', listingController.getListingsByRestaurant);

router.post('/:rid/create', listingController.createListing)

router.post('/:rid/delete-type', listingController.deleteListingType)

router.post('/:lid/delete', listingController.deleteLiveListing)
const Router = require("express-promise-router");
const router = new Router();

var listingController = require("../controllers/listingController");

module.exports = router;

router.get('/:lid', listingController.getListingById)

router.get('/all/:rid', listingController.getListingsByRestaurant);

router.get('/types/:rid' ,listingController.getListingTypesByRestaurant)

router.post('/:rid/create', listingController.createListing)

router.put("/:lid/update", listingController.updateListingQuantity);

router.post('/:rid/delete-type', listingController.deleteListingType)

router.post('/:lid/delete', listingController.deleteLiveListing)

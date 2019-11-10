const Router = require("express-promise-router");
const router = new Router();

var listingController = require("../controllers/listingController");

module.exports = router;

router.post("/:rid/create", listingController.createListing);

router.post("/:lid/delete", listingController.deleteListing);

router.put("/:lid/update", listingController.updateListingQuantity);

const Router = require("express-promise-router");
const router = new Router();

var donationController = require("../controllers/donationController");

module.exports = router;

router.get("/", donationController.getAllDonations);

router.post("/:uid/donate", donationController.submitDonation);

router.get("/user/:uid", donationController.getAllDonationsForUser);

router.get("/shelter/:sid", donationController.getAllDonationsForShelter);

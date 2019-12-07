const Router = require("express-promise-router");
const router = new Router();

var shelterController = require("../controllers/shelterController");

module.exports = router;

router.get("/", shelterController.getShelters);

router.get("/:sid", shelterController.getShelterByID);

router.post("/login", shelterController.login);

router.put("/:sid/description/update", shelterController.updateDescription);

const Router = require("express-promise-router");
const router = new Router();

var orderController = require("../controllers/orderController");

module.exports = router;

router.get("/", orderController.getAllCompletedOrders);

router.get("/restaurant/:rid/completed", orderController.getCompletedOrdersByRestaurantId);

router.get("/id", orderController.getAllOrdersByID);

router.post("/user/:uid/submit", orderController.submitOrderUser);

router.post("/shelter/:sid/submit", orderController.submitOrderShelter);

router.get("/current/id", orderController.getCurrentOrdersByID);

router.get("/past/:id", orderController.getPastOrdersByID);

router.put("/:oid/:rid/accept", orderController.acceptOrder);

router.put("/:oid/:rid/cancel", orderController.cancelOrder);

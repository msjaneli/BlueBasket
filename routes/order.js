const Router = require("express-promise-router");
const router = new Router();

var orderController = require("../controllers/orderController");

module.exports = router;

router.get("/", orderController.getAllCompletedOrders);

router.get("/restaurant/:rid/completed", orderController.getCompletedOrdersByRestaurantId);

router.get("/restaurant/:rid/pending", orderController.getPendingOrdersByRestaurantId);

router.get("/restaurant/:rid/accepted", orderController.getAcceptedOrdersByRestaurantId);

router.get("/id", orderController.getAllOrdersByID);

router.post("/user/:uid/submit", orderController.submitOrderUser);

router.post("/shelter/:sid/submit", orderController.submitOrderShelter);

router.get("/current/:uid", orderController.getCurrentOrdersById);

router.get("/current/:sid", orderController.getCurrentOrdersByIdShelter);

router.get("/past/:uid", orderController.getPastOrdersById);

router.get("/past/:sid", orderController.getPastOrdersByIdShelter);

router.put("/:oid/:rid/accept", orderController.acceptOrder);

router.put("/:oid/:rid/cancel", orderController.cancelOrder);

router.put("/:oid/:rid/complete", orderController.completeOrder);

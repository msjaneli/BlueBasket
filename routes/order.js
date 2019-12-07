const Router = require("express-promise-router");
const router = new Router();

var orderController = require("../controllers/orderController");

module.exports = router;

router.get("/", orderController.getAllCompletedOrders);

router.get("/restaurant/:rid/completed", orderController.getCompletedOrdersByRestaurantId);

router.get("/user/:uid", orderController.getAllOrdersByUser);

router.get("/shelter/:sid", orderController.getAllOrdersByShelter);

router.post("/user/:uid/submit", orderController.submitOrderUser);

router.post("/shelter/:sid/submit", orderController.submitOrderShelter);

router.get("/shelter/current/:sid", orderController.getCurrentOrdersByShelter);

router.get("/user/current/:uid", orderController.getCurrentOrdersByUser);

router.get("/shelter/past/:sid", orderController.getPastOrdersByShelter);

router.get("/user/past/:uid", orderController.getPastOrdersByUser);

router.put("/:oid/:rid/accept", orderController.acceptOrder);

router.put("/:oid/:rid/cancel", orderController.cancelOrder);

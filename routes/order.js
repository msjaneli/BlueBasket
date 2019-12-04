const Router = require("express-promise-router");
const router = new Router();

var orderController = require("../controllers/orderController");

module.exports = router;

router.get("/", orderController.getAllCompletedOrders);

router.get("/restaurant/:rid/completed", orderController.getCompletedOrdersByRestaurantId);

router.get("/user/:uid", orderController.getAllOrdersByUser);

router.get("/user/current/:uid", orderController.getCurrentOrdersByUser);

router.get("/user/past/:uid", orderController.getPastOrdersByUser);

router.post("/:uid/submit", orderController.submitOrder);

router.put("/:oid/:rid/accept", orderController.acceptOrder);

router.put("/:oid/:rid/cancel", orderController.cancelOrder);

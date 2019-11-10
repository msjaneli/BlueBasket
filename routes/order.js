const Router = require("express-promise-router");
const router = new Router();

var orderController = require("../controllers/orderController");

module.exports = router;

router.get("/", orderController.getAllCompletedOrders);

router.get("/restaurant/:rid/completed", orderController.getCompletedOrdersByRestaurantId);

router.get("/user/:uid", orderController.getAllOrdersByUser);

router.post("/:uid/submit", orderController.submitOrder);

router.put("/:oid/:rid/accept", orderController.acceptOrder);

router.put("/:oid/:rid/cancel", orderController.cancelOrder);

///pgadmin
/*
id: number
uid: foreign key, number, required, distinct
lids: array of numbers, each a foreign key to listings
quantities: array of numbers
notes: array of varchar(500)
status: varchar(20)
*/
//uid, array of lid, array of quantity, note, status

//We are going to decrement the listing quantity every time someone submits an order
//Then, there is a chance that people have the now sold out item in their cart when it sells out,
//Also a chance that restaurant takes listing down before

const isEmpty = require("../validation/isEmpty");
const db = require("../db");
const pending = "pending",
  accepted = "accepted",
  cancelled = "cancelled";

exports.getAllCompletedOrders = async (req, res) => {
  const query = {
    text: "SELECT * FROM orders WHERE status = $1",
    values: [accepted]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.getCompletedOrdersByRestaurantId = async (req, res) => {
  var rid = req.params.rid;

  const query = {
    text: "SELECT * FROM orders WHERE rid = $1 AND status = $2",
    values: [rid, accepted]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.getAllOrdersByUser = async (req, res) => {
  var uid = req.params.uid;

  const query = {
    text: "SELECT * FROM orders WHERE uid = $1",
    values: [uid]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.submitOrder = async (req, res) => {
  var uid = req.params.uid;
  var cart = req.params.cart;

  var oid = Math.random()
    .toString(36)
    .substr(2, 20);

  var lids, quantities, notes, oid;

  for (var rID in cart) {
    lids = [];
    quantities = [];
    notes = [];
    for (var listingOrder in rID.orders) {
      lids.push(listingOrder.lid);
      quantities.push(listingOrder.quantity);
      notes.push(listingOrder.note);
    }
    const postOrder = {
      text: "INSERT INTO orders VALUES($1, $2, $3, $4, $5, $6, $7)",
      values: [oid, uid, rID, lids, quantities, notes, pending]
    };
    await db.query(postOrder);
  }
  return res.status(200).send({ success: "Successfully submitted order" });
};

exports.acceptOrder = async (req, res) => {
  var oid = req.params.oid;
  var rid = req.params.rid;

  const updateOrder = {
    text:
      "UPDATE orders SET status = $1 WHERE id = $2 AND rid = $3 AND status = $4",
    values: [accepted, oid, rid, pending]
  };

  const { rows } = await db.query(updateOrder);
  if (isEmpty(rows))
    return res
      .status(400)
      .send({ error: "Tried accepting an order that is not pending" });
  return res.status(200).send({ success: "Successfully accepted order" });
};

exports.cancelOrder = async (req, res) => {
  var oid = req.params.oid;
  var rid = req.params.rid;

  const cancelOrder = {
    text:
      "UPDATE orders SET status = $1 WHERE id = $2 AND rid = $3 AND status = $4",
    values: [cancelled, oid, rid, pending]
  };
  await db.query(cancelOrder);
  const { rows } = await db.query(cancelOrder);
  if (isEmpty(rows))
    return res
      .status(400)
      .send({ error: "Tried cancelling an order that is not pending" });
  return res.status(200).send({ sucess: "Successfully cancelled order" });
};

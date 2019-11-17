const isEmpty = require("../validation/isEmpty");
const db = require("../db");
const pending = "pending",
  accepted = "accepted",
  cancelled = "cancelled";
require("dotenv").config();
const stripe_key = process.env.STRIPE_SKEY;
const stripe = require("stripe")(stripe_key);

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
  var orders = req.body.orders;
  const token = req.body.stripeToken;
  var oid = Math.random()
    .toString(36)
    .substr(2, 20);
  var postOrders = [];
  for (var rid in orders) {
    try {
      // Create stripe charge for this rid
      const getStripeAcc = {
        text: "SELECT stripe_acc FROM restaurant_account WHERE rid = $1",
        values: [rid]
      };
      const { rows } = await db.query(getStripeAcc);
      await stripe.charges.create(
        {
          amount: orders[rid].total,
          currency: "usd",
          description: "Order for user " + str(uid),
          source: token
        },
        {
          stripe_account: rows[0]
        }
      );
    } catch (err) {
      // Card invalid
      return res
        .status(400)
        .send({ error: "Order was not processed successfully" });
    }

    const postOrder = {
      text: "INSERT INTO orders VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
      values: [
        oid,
        uid,
        rid,
        orders[rid].lids,
        orders[rid].quantities,
        orders[rid].notes,
        pending,
        orders[rid].total
      ]
    };
    postOrders.push(postOrder);
  }
  for (var post in postOrders) {
    await db.query(post);
  }
  return res.status(200).send({ success: "Order was processed successfully" });
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

const isEmpty = require("../validation/isEmpty");
const moment = require("moment");
const db = require("../db");
const pending = "Pending",
  accepted = "Accepted",
  cancelled = "Cancelled",
  completed = "Completed";
require("dotenv").config();
const stripe_key = process.env.STRIPE_SKEY;
const stripe = require("stripe")(stripe_key);
const accountSid = 'ACe6525892df0dc3d33f56dfe8b725525c'
const authToken = '661fa4f934e01953db6c57677d503015'
const twilioNumber = '+12568418199'
const client = require('twilio')(accountSid, authToken);

exports.getAllCompletedOrders = async (req, res) => {
  const query = {
    text: "SELECT * FROM orders WHERE status = $1",
    values: [accepted]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.getPendingOrdersByRestaurantId = async (req, res) => {
  var rid = req.params.rid;

  const query = {
    text: "SELECT * FROM orders WHERE rid = $1 AND status = $2",
    values: [rid, pending]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
}

exports.getAcceptedOrdersByRestaurantId = async (req, res) => {
  var rid = req.params.rid;

  const query = {
    text: "SELECT * FROM orders WHERE rid = $1 AND status = $2",
    values: [rid, accepted]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
}

exports.getCompletedOrdersByRestaurantId = async (req, res) => {
  var rid = req.params.rid;

  const query = {
    text: "SELECT * FROM orders WHERE rid = $1 AND status = $2",
    values: [rid, completed]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.getAllOrdersByID = async (req, res) => {
  var uid = req.params.id;

  const query = {
    text: "SELECT * FROM orders WHERE uid = $1",
    values: [uid]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.getAllOrdersByShelter = async (req, res) => {
  var sid = req.params.sid;

  const query = {
    text: "SELECT * FROM orders WHERE uid = $1",
    values: [sid]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.getCurrentOrdersById = async (req, res) => {
  var uid = req.params.uid;

  const query = {
    text: "SELECT * FROM orders WHERE uid = $1 AND status=$2 OR status=$3",
    values: [uid, pending, accepted]

  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.getPastOrdersById = async (req, res) => {
  var uid = req.params.uid;

  const query = {
    text: "SELECT * FROM orders WHERE uid = $1 AND status = $2 OR status = $3",
    values: [uid, completed, cancelled]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.submitOrderUser = async (req, res) => {
  var initialError = false;
  req.body.tokenGenResults.forEach(result => {
    if (!isEmpty(result.error)) {
      initialError = true;
      return res.status(400).send({ error: result.error.message });
    }
  });
  if (initialError) {
    return;
  }
  var uid = req.params.uid;
  var name = req.body.name;
  var phoneNumber = req.body.phoneNumber;
  const tokens = req.body.tokenGenResults;
  var orders = req.body.orders;
  var oid = Math.random()
    .toString(36)
    .substr(2, 20);
  var postOrders = [];

  var index = 0;
  const timestamp = moment().format("YYYY/MM/D hh:mm:ss A");
  for (var rid in orders) {
    try {
      // Create stripe charge for this rid
      const getStripeAcc = {
        text: "SELECT stripe_acc FROM restaurant_account WHERE rid = $1",
        values: [rid]
      };
      const { rows } = await db.query(getStripeAcc);
      const stripe_acc = rows[0].stripe_acc;

      await stripe.charges.create(
        {
          amount: Math.round(orders[rid].total * 1.0675 * 100),
          currency: "usd",
          description: "Order for user " + uid + ", " + name,
          source: tokens[index].token.id,
          receipt_email: req.body.email
        },
        {
          stripe_account: stripe_acc
        }
      );
    } catch (err) {
      // Card invalid
      console.log(err);
      return res.status(400).send({ error: err.code + ": " + err.message });
    }

    const postOrder = {
      text:
        "INSERT INTO orders VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      values: [
        oid,
        uid,
        rid,
        orders[rid].lids,
        orders[rid].quantities,
        orders[rid].notes,
        pending,
        orders[rid].total,
        timestamp,
        [],
        phoneNumber
      ]
    };
    postOrders.push(postOrder);

    index++;
  }
  postOrders.forEach(async post => {
    await db.query(post);
  });
  if (!isEmpty(phoneNumber)) {
    client.messages.create({
      body: 'Hi, ' + name + '! Thank You for using Blue Basket. The vendors you have ordered from have been notifited. They will let you know when your order has both been accepted and completed.',
      from: twilioNumber,
      to: '+1' + phoneNumber
    })
  }
  return res.status(200).send({ success: "Order submitted successfully!" });
};

exports.acceptOrder = async (req, res) => {
  var oid = req.params.oid;
  var rid = req.params.rid;
  var phoneNumber = req.body.phoneNumber

  const updateOrder = {
    text:
      "UPDATE orders SET status = $1 WHERE oid = $2 AND rid = $3 AND status = $4",
    values: [accepted, oid, rid, pending]
  };

  const getRestaurant = {
    text: "SELECT name from restaurant_account WHERE rid = $1",
    values: [rid]
  }

  const { rows } = await db.query(getRestaurant);
  const restaurantName = rows[0].name

  try {
    await db.query(updateOrder);
    if (!isEmpty(phoneNumber)) {
      client.messages.create({
        body: 'Hi! Looks like ' + restaurantName + ' has accepted your order. It will be ready for pickup at the BC circle shortly!',
        from: twilioNumber,
        to: '+1' + phoneNumber
      })
    }
    return res.status(200).send({success: "Successfully accepted order"})

  } catch (err) {
    return res.status(400).send({error: "Unable to accept order"})
  }
};

exports.cancelOrder = async (req, res) => {
  var oid = req.params.oid;
  var rid = req.params.rid;

  const cancelOrder = {
    text:
      "UPDATE orders SET status = $1 WHERE oid = $2 AND rid = $3 AND status = $4",
    values: [cancelled, oid, rid, pending]
  };
  
  try {
    await db.query(cancelOrder);
    return res.status(200).send({success: "Successfully cancelled order"})

  } catch (err) {
    return res.status(400).send({error: "Unable to cancel order"})
  }
};

exports.completeOrder = async (req, res) => {
  var oid = req.params.oid;
  var rid  = req.params.rid; 
  var phoneNumber = req.body.phoneNumber


  const completeOrder = {
    text: "UPDATE orders SET status = $1 WHERE oid = $2 AND rid=$3 AND status=$4",
    values: [completed, oid, rid, accepted]
  }

  const getRestaurant = {
    text: "SELECT name from restaurant_account WHERE rid = $1",
    values: [rid]
  }

  const { rows } = await db.query(getRestaurant);
  const restaurantName = rows[0].name

  try {
    await db.query(completeOrder);
    if (!isEmpty(phoneNumber)) {
      client.messages.create({
        body: 'Hi! Looks like ' + restaurantName + ' has completed your order. It is ready for pickup at the BC cirle!',
        from: twilioNumber,
        to: '+1' + phoneNumber
      })
    }
    return res.status(200).send({success: "Successfully completed order"})

  } catch (err) {
    return res.status(400).send({error: "Unable to complete order"})
  }
}

exports.submitOrderShelter = async (req, res) => {
  var initialError = false;
  req.body.tokenGenResults.forEach(result => {
    if (!isEmpty(result.error)) {
      initialError = true;
      return res.status(400).send({ error: result.error.message });
    }
  });
  if (initialError) {
    return;
  }
  var sid = req.params.sid;
  var name = req.body.name;
  const timestamp = Date.parse(moment().format("YYYY/MM/D hh:mm:ss"));
  var orders = req.body.orders;
  var oid = Math.random()
    .toString(36)
    .substr(2, 20);
  var postOrders = [];

  var index = 0;

  for (var rid in orders) {
    try {
      // Create stripe charge for this rid
      const getStripeAcc = {
        text: "SELECT stripe_acc FROM restaurant_account WHERE rid = $1",
        values: [rid]
      };
      const { rows } = await db.query(getStripeAcc);
      const stripe_acc = rows[0].stripe_acc;

      await stripe.transfers.create({
        amount: Math.round(orders[rid].total * 1.0675 * 100),
        currency: "usd",
        description: "Order for shelter " + sid + ", " + name,
        destination: stripe_acc
      });
    } catch (err) {
      // Card invalid
      console.log(err);
      return res.status(400).send({ error: err.code + ": " + err.message });
    }

    const postOrder = {
      text: "INSERT INTO orders VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      values: [
        oid,
        sid,
        rid,
        orders[rid].lids,
        orders[rid].quantities,
        orders[rid].notes,
        pending,
        orders[rid].total,
        timestamp
      ]
    };
    postOrders.push(postOrder);

    index++;
  }
  postOrders.forEach(async post => {
    await db.query(post);
  });
  return res.status(200).send({ success: "Order submitted successfully!" });
};

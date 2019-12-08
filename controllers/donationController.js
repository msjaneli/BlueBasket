const db = require("../db");
const moment = require("moment");
require("dotenv").config();
const stripe_key = process.env.STRIPE_SKEY;
const stripe = require("stripe")(stripe_key);

exports.getAllDonations = async (req, res) => {
  const query = {
    text: "SELECT * FROM donations"
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.submitDonation = async (req, res) => {
  var uid = req.params.uid;
  var sid = req.body.sid;
  var amount = req.body.amount;
  var token = req.body.token;
  var did = Math.random()
    .toString(36)
    .substr(2, 18);
  const timestamp = moment().format("YYYY/MM/D hh:mm:ss A");

  try {
    const getStripeAcc = {
      text: "SELECT stripe_acc FROM shelters WHERE sid = $1",
      values: [sid]
    };
    const { rows } = await db.query(getStripeAcc);
    const stripe_acc = rows[0].stripe_acc;

    await stripe.charges.create(
      {
        amount: Math.round(amount * 1.0675 * 100),
        currency: "usd",
        description: "Donation for user " + uid + " to " + sid,
        source: token
      },
      {
        stripe_account: stripe_acc
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: err.code + ": " + err.message });
  }
  const postDonation = {
    text: "INSERT INTO donations VALUES($1, $2, $3, $4, $5)",
    values: [did, uid, sid, amount, timestamp]
  };
  await db.query(postDonation);
  return res.status(200).send({ success: "Donation successful!" });
};

exports.getAllDonationsForUser = async (req, res) => {
  var uid = req.params.uid;
  const query = {
    text: "SELECT * FROM donations WHERE uid = $1",
    values: [uid]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.getAllDonationsForShelter = async (req, res) => {
  var sid = req.params.sid;
  const query = {
    text: "SELECT * FROM donations WHERE sid = $1",
    values: [sid]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

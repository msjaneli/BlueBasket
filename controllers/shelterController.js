const isEmpty = require("../validation/isEmpty");
const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

exports.getShelters = async (req, res) => {
  const query = {
    text: "SELECT * FROM shelters"
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows);
};

exports.getShelterByID = async (req, res) => {
  var sid = req.params.sid;
  const query = {
    text: "SELECT * FROM shelters WHERE sid = $1",
    values: [sid]
  };
  const { rows } = await db.query(query);
  return res.status(200).send(rows[0]);
};

exports.login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  const getShelterInfo = {
    text: "SELECT sid, password, name FROM shelters WHERE email = $1",
    values: [email]
  };

  const { rows } = await db.query(getShelterInfo);

  var passwordHash = "";
  var name = "";
  var sid = "";

  if (!isEmpty(rows)) {
    passwordHash = rows[0].password;
    name = rows[0].name;
    sid = rows[0].sid;
  } else {
    return res.status(400).json({ error: "Email or password is invalid" });
  }

  const match = await bcrypt.compare(password, passwordHash);

  if (match) {
    const loginResult = {
      token: sid,
      shelterData: {
        id: sid,
        email,
        name,
        type: "SHELTER"
      }
    };
    return res.status(200).send(loginResult);
  } else {
    res.status(400).json({ error: "Email or password is invalid" });
  }
};

exports.updateDescription = async (req, res) => {
  var sid = req.params.sid;
  var description = req.body.description;
  const updateDesc = {
    text: "UPDATE shelters SET description = $1 WHERE sid = $2",
    values: [description, sid]
  };
  try {
    await db.query(updateDesc);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Unsucessful in updating description" });
  }
  return res.status(200).send({ success: "Successfully updated description" });
};

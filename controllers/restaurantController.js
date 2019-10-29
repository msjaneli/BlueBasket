const isEmpty = require('../validation/isEmpty');
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getRestaurants = async (req, res) => {
    const query = {
        text: 'SELECT * FROM restaurant_account'
    }
    const { rows } = await db.query(query);
    return res.send(rows);
} 

exports.register = async (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;

    const checkEmailExists = {
        text: 'SELECT * FROM restaurant_account WHERE email = $1',
        values: [email]
    }

    const { rows } = await db.query(checkEmailExists);
    if (!isEmpty(rows)) {
        return res.status(400).json({error: "There is already a restaurant registered under this email address"});
    } 

    const rid = Math.random().toString(36).substr(2, 9);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const createRestaurant = {
        text: 'INSERT INTO restaurant_account VALUES($1, $2, $3, $4, $5, $6)',
        values: [rid, name, description, email, passwordHash, phone]
    }

    await db.query(createRestaurant);
    return res.status(200).send({success: "Successfully registered new restaurant"});
}

exports.login = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    const getRestaurantInfo = {
        text: 'SELECT rid, password, name FROM restaurant_account WHERE email = $1',
        values: [email]
    }

    const { rows }  = await db.query(getRestaurantInfo);

    var passwordHash = "";
    var name = "";
    var rid = "";

    // Finding no user
    if (!isEmpty(rows)) {
        passwordHash = rows[0].password;
        name = rows[0].name;
        rid = rows[0].rid;
    }

    // Facebook user has no stored password or no user found, so this authentication route should not let them log in.
    if (isEmpty(rows)) {
        return res.status(400).json({error: "Email or Password is Invalid"})
    }

    const match = await bcrypt.compare(password, passwordHash);

    if (match) {
        const loginResult = {
            token: rid,
            restaurantData: {
                id: rid,
                email,
                name,
                type: "RESTAURANT"
            }
        }
        return res.status(200).send(loginResult);
    } else {
        res.status(400).json({error: "Email or Password is Invalid"})
    }
}
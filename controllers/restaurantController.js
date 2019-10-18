const db = require('../db');
const bcrypt = require('bcrypt');

const validateLoginInput = require('../validation/validateLoginInput');

exports.getRestaurants = async (req, res) => {
    const query = {
        text: 'SELECT * FROM user_account'
    }
    const { rows } = await db.query(query);
    return res.send(rows);
} 

exports.login = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.send(errors);
    }

    const getPasswordHash = {
        text: 'SELECT password FROM restaurant_account WHERE email = $1',
        values: [email]
    }

    const { rows }  = await db.query(getPasswordHash);

    const passwordHash = rows[0].password;

    const match = await bcrypt.compare(password, passwordHash);

    return res.send(match);
}
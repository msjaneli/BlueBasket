const isEmpty = require('../validation/isEmpty');
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getUsers = async (req, res) => {
    const query = {
        text: 'SELECT * FROM user_account'
    }
    const { rows } = await db.query(query);
    return res.send(rows);
} 

exports.getId = async (req, res) => {
    var email = req.params.email

    const query = {
        text: 'SELECT uid FROM user_account WHERE email = $1',
        values: [email]
    }

    const { rows } = await db.query(query);
    return res.status(200).send(rows[0].uid);
}

exports.checkUserExists = async (req, res) => {
    var email = req.body.email;

    const checkEmailExists = {
        text: 'SELECT * FROM user_account WHERE email = $1',
        values: [email]
    }

    const { rows } = await db.query(checkEmailExists);
    return res.status(200).send(!isEmpty(rows));
}

exports.registerUser = async (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;
    var restrictions = req.body.restrictions;

    const checkEmailExists = {
        text: 'SELECT * FROM user_account WHERE email = $1',
        values: [email]
    }

    const { rows } = await db.query(checkEmailExists);
    if (!isEmpty(rows)) {
        return res.status(400).json({error: "There is already a user registered under this email address"});
    } 

    const uid = Math.random().toString(36).substr(2, 9);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const createUser = {
        text: 'INSERT INTO user_account VALUES($1, $2, $3, $4, $5, $6)',
        values: [uid, name, email, passwordHash, phone, restrictions]
    }

    await db.query(createUser);
    return res.status(200).send({success: "Successfully registered new user"});
}

exports.registerFacebookUser = async (req, res) => {
    var uid = req.body.uid;
    var name = req.body.name;
    var email = req.body.email;

    const createUser = {
        text: 'INSERT INTO user_account VALUES($1, $2, $3)',
        values: [uid, name, email]
    }

    await db.query(createUser);
    return res.status(200).send({success: "Successfully registered new Facebook user"});
}

exports.login = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    const getUserInfo = {
        text: 'SELECT uid, password, name FROM user_account WHERE email = $1',
        values: [email]
    }

    const { rows }  = await db.query(getUserInfo);

    var passwordHash = "";
    var name = "";
    var uid = "";

    // Finding no user
    if (!isEmpty(rows)) {
        passwordHash = rows[0].password;
        name = rows[0].name;
        uid = rows[0].uid;
    }

    // Facebook user has no stored password or no user found, so this authentication route should not let them log in.
    if (isEmpty(passwordHash) || isEmpty(rows)) {
        return res.status(400).json({error: "Email or Password is Invalid"})
    }

    const match = await bcrypt.compare(password, passwordHash);

    if (match) {
        const loginResult = {
            token: uid,
            userData: {
                id: uid,
                email,
                name,
                type: "USER"
            }
        }
        return res.status(200).send(loginResult);
    } else {
        res.status(400).json({error: "Email or Password is Invalid"})
    }

}
const isEmpty = require('../validation/isEmpty');
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validateRegistrationInput = require('../validation/validateRegistrationInput')

exports.listUsers = async (req, res) => {
    const query = {
        text: 'SELECT * FROM user_account'
    }
    const { rows } = await db.query(query);
    res.send(rows);
} 

exports.checkUserExists = async (req, res) => {
    var email = req.body.email;

    const checkEmailExists = {
        text: 'SELECT * FROM user_account WHERE email = $1',
        values: [email]
    }

    try {
        const { rows } = await db.query(checkEmailExists);
        res.send(!isEmpty(rows));
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.registerUser = async (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;
    var restrictions = req.body.restrictions;

    const { errors, isValid } = validateRegistrationInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const checkEmailExists = {
        text: 'SELECT * FROM user_account WHERE email = $1',
        values: [email]
    }

    try {
        const { rows } = await db.query(checkEmailExists);
        if (!isEmpty(rows)) {
            return res.status(400).json({error: "There is already a user registered under this email address"});
        } 
    } catch(err) {
        return res.status(400).json(err);
    }

    const uid = Math.random().toString(36).substr(2, 9);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const createUser = {
        text: 'INSERT INTO user_account VALUES($1, $2, $3, $4, $5, $6)',
        values: [uid, name, email, passwordHash, phone, restrictions]
    }

    try {
        await db.query(createUser);
        return res.status(200).json({success: "Successfully registered new user"});
    } catch(err) {
        return res.status(400).json(err);
    }
}

exports.registerFacebookUser = async (req, res) => {
    var uid = req.body.uid;
    var name = req.body.name;
    var email = req.body.email;

    const createUser = {
        text: 'INSERT INTO user_account VALUES($1, $2, $3)',
        values: [uid, name, email]
    }

    try {
        await db.query(createUser);
        return res.status(200).json({success: "Successfully registered new Facebook user"});
    } catch(err) {
        return res.status(400).json(err);
    }

}

exports.login = async (req, res) => {

}
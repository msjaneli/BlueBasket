const isEmpty = require('../validation/isEmpty');
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.getRestaurants = async (req, res) => {
    const query = {
        text: 'SELECT * FROM restaurant_account'
    }
    const { rows } = await db.query(query);
    return res.status(200).send(rows);
} 

exports.getRestaurantById = async (req, res) => {
    var rid = req.params.rid;

    const query = {
        text: 'SELECT * FROM restaurant_account WHERE rid = $1',
        values: [rid]
    }
    const { rows } = await db.query(query);
    return res.status(200).send(rows[0])
}

exports.updateImage = async (req, res) => {
    var rid = req.params.rid;
    var image = req.body.image;

    const query = {
        text: 'SELECT name FROM restaurant_account WHERE rid = $1',
        values: [rid]
    }

    const { rows } = await db.query(query);
    var name = rows[0].name;

    const uploadedImage = await cloudinary.uploader.upload(process.cwd() + image, {
        resource_type: "image",
        public_id: "restaurant_image/" + name,
        overwrite: true,
        format: 'jpg'
    });

    const version = uploadedImage.version;

    const resizedImageUrl = await cloudinary.url("restaurant_image/" + name.split(' ').join('%20') + '.jpg', {
        version: version,
        quality: 100,
        height: 400,
        width: 400,
        crop: 'scale'
    })


    const updateQuery = {
        text: 'UPDATE restaurant_account SET image=$1 WHERE rid=$2',
        values: [resizedImageUrl, rid]
    }

    await db.query(updateQuery);
    res.status(200).send(resizedImageUrl);
    
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
const isEmpty = require('../validation/isEmpty');
const db = require('../db');

exports.createListing = async (req, res) => {
    var rid = req.params.rid
    var type = req.body.type;
    var description = req.body.description;
    var allergens = req.body.allergens;
    var quantity = req.body.quantity;
    var price = req.body.price;

    const checkTypeExists = {
        text: 'SELECT * FROM listing_type WHERE type = $1 and description = $2',
        values: [type, description]
    }

    const { rows } = await db.query(checkTypeExists);
    if (isEmpty(rows)) {
        const createNewType = {
            text: 'INSERT INTO listing_type VALUES($1, $2, $3)',
            values: [rid, type, description]
        }
        await db.query(createNewType);
    }

    const lid = Math.random().toString(36).substr(2, 15);

    const createLiveListing = {
        text: 'INSERT INTO live_listing VALUES($1, $2, $3, $4, $5, $6, $7)',
        values: [lid, rid, type, description, allergens, quantity, price]
    }

    try {
        await db.query(createLiveListing);
        const listingData = {
            lid: lid,
            rid: rid,
            type: type,
            description: description,
            allergens: allergens,
            quantity: quantity,
            price: price
        }
        res.status(200).send(listingData)
    } catch (err) {
        // Assume front end successfully validates that none of the fields are empty. Then the only error is description and type duplicates
        res.status(400).json({error: "You can only have one type/description combination in your listings!"})
    }
}

exports.deleteListing = async (req, res) => {
    var lid = req.params.lid;

    const deleteListing = {
        text: 'DELETE FROM live_listing WHERE lid = $1',
        values: [lid]
    }

    await db.query(deleteListing);
    res.status(200).send("Deleted listing");
}
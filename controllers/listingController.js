const db = require('../db');

exports.createListing = async (req, res) => {
    var rid = req.params.rid
    var type = req.body.type;
    var description = req.body.description;
    var allergens = req.body.allergens;
    var quantity = req.body.quantity;
    var price = req.body.price;

    const lid = Math.random().toString(36).substr(2, 15);

    const createListing = {
        text: 'INSERT INTO listing VALUES ($1, $2, $3, $4, $5, $6, $7)',
        values: [lid, rid, type, description, allergens, quantity, price]
    }

    try {
        await db.query(createListing);
        res.status(200).send("Successfully created new listing")
    } catch (err) {
        // Assume front end successfully validates that none of the fields are empty. Then the only error is description and type duplicates
        res.status(400).json({error: "You can only have one type/description combination in your listings!"})
    }
}
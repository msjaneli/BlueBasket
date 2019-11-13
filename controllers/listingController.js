const isEmpty = require('../validation/isEmpty');
const db = require('../db');

exports.getListingById = async(req, res) => {
    var lid = req.params.lid

    const getListings = {
        text: 'SELECT * FROM live_listing where lid = $1',
        values: [lid]
    }
    const { rows } = await db.query(getListings);
    res.status(200).send(rows[0]);
}

exports.getListingsByRestaurant = async (req, res) => {
    var rid = req.params.rid

    const getListings = {
        text: 'SELECT * FROM live_listing WHERE rid = $1',
        values: [rid]
    }

    const { rows } = await db.query(getListings);
    res.status(200).send(rows);
}

exports.createListing = async (req, res) => {
    var rid = req.params.rid
    var name = req.body.name;
    var type = req.body.type;
    var description = req.body.description;
    var allergens = req.body.allergens;
    var quantity = req.body.quantity;
    var price = req.body.price;

    const checkTypeExists = {
        text: 'SELECT * FROM listing_type WHERE rid = $1 and name = $2',
        values: [rid, name]
    }

    const { rows } = await db.query(checkTypeExists);
    if (isEmpty(rows)) {
        const createNewType = {
            text: 'INSERT INTO listing_type VALUES($1, $2, $3, $4)',
            values: [rid, name, type, description]
        }
        await db.query(createNewType);
    }

    const lid = Math.random().toString(36).substr(2, 15);

    const createLiveListing = {
        text: 'INSERT INTO live_listing VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [lid, rid, name, type, description, allergens, quantity, price]
    }

    try {
        await db.query(createLiveListing);
        const listingData = {
            lid: lid,
            rid: rid,
            name: name,
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

exports.updateListingQuantity = async (req, res) => {
  var lid = req.params.lid;
  var quantityChange = req.body.quantityChange;

  const getListing = {
    text: "SELECT * FROM live_listing WHERE lid = $1",
    values: [lid]
  };
  const { rows } = await db.query(getListing);
  var quantityRemain = rows[0].quantity
  if (quantityRemain + quantityChange < 0) {
    //user ordering more than restaurant has
    res.status(400).json({ error: "Invalid Quantity: The restaurant only has " + quantityRemain + " left of this listing. Please add less to cart" });
    return;
  }

  const updateListing = {
    text: "UPDATE live_listing SET quantity = quantity + $1 WHERE lid = $2",
    values: [quantityChange, lid]
  };

  try {
    await db.query(updateListing);
    res.status(200).send(updateListing);
  } catch (err) {
    res.status(400).json({ error: "Could not update listing quantity" });
  }
};

exports.deleteListingType = async (req, res) => {
    var rid = req.params.rid
    var name = req.body.name

    const deleteListingType = {
        text: 'DELETE FROM listing_type WHERE rid = $1 and name = $2',
        values: [rid, name]
    }

    await db.query(deleteListingType);
    res.status(200).send("Deleted listing type: " + rid + ", " + name)
}

exports.deleteLiveListing = async (req, res) => {
    var lid = req.params.lid;

    const deleteListing = {
        text: 'DELETE FROM live_listing WHERE lid = $1',
        values: [lid]
    }

    const { rows} = await db.query(deleteListing);
    console.log(rows);
    res.status(200).send("Deleted listing: " + lid);
}
const db = require('../db');

exports.user_list = async (req, res) => {
    const query = {
        text: 'SELECT * FROM userstest'
    }
    const { rows } = await db.query(query);
    res.send(rows);
} 
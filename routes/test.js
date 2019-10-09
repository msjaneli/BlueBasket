const Router = require('express-promise-router')

const db = require('../db');

const router = new Router();

module.exports = router;

router.get('/', async (req, res) => {
    const query = {
        text: 'SELECT * FROM userstest',
    }
    const { rows } = await db.query(query)
    res.send(rows[0]);
})
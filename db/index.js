const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.PSQL_URI,
    ssl: true
})

// Export a query function that takes in a query object
module.exports = {
    query: query => pool.query(query)
}
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://zuvtayihazbfyb:d44d07396941e7ed9b8a6c644db1e461f436236f3cfebd9289e068b0fee10509@ec2-54-243-49-82.compute-1.amazonaws.com:5432/dfhtvgrd27av3s",
    ssl: true
})

// Export a query function that takes in a query object
module.exports = {
    query: query => pool.query(query)
}
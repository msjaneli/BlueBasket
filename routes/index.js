// Mounts the routes on the express app.

const test = require('./test')

module.exports = app => {
    app.use('/test', test);
}
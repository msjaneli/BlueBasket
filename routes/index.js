// Mounts the routes on the express app.

const test = require('./test')
const user = require('./user');

module.exports = app => {
    app.use('/test', test);
    app.use('/user', user);
}
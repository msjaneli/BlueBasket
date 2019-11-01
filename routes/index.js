// Mounts the routes on the express app.

const test = require('./test');
const user = require('./user');
const restaurant = require('./restaurant');
const listing = require('./listing');

module.exports = app => {
    app.use('/test', test);
    app.use('/user', user);
    app.use('/restaurant', restaurant);
    app.use('/listing', listing);
}
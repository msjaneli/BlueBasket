const test = require('./test')

module.exports = app => {
    app.use('/test', test);
}
const express = require('express');
const mountRoutes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

// Calling this will mount the routes onto the express app. (Using the code found in index.js within ./routes)
mountRoutes(app);

// Use body-parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Default get route
app.get('/', function(req, res) {
  res.send('Get on "/" route!');
});

// Listen on port 8080
app.listen(8080, function() {
  console.log('Blue basket web app "back-end" on 8080!');
});
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const mountRoutes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

// Use body-parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Calling this will mount the routes onto the express app. (Using the code found in index.js within ./routes)
mountRoutes(app);

// Default get route
app.get('/', function(req, res) {
  res.send('Get on "/" route!');
});

// var options = {
//   key: fs.readFileSync('./cert/client-key.pem'),
//   cert: fs.readFileSync('./cert/client-cert.pem')
// }

// https.createServer(options, app).listen(8080, () => console.log("Blue basket on 8080"));

// Listen on port 8080
app.listen(8080, function() {
  console.log('Blue basket web app "back-end" on 8080!');
});
const express = require('express');
const mountRoutes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
mountRoutes(app);


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)



app.get('/', function(req, res) {
  res.send('Get on "/" route!');
});

app.listen(8080, function() {
  console.log('Blue basket web app "back-end" on 8080!');
});
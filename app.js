const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var pg = require('pg');

var conString = "postgres://zuvtayihazbfyb:d44d07396941e7ed9b8a6c644db1e461f436236f3cfebd9289e068b0fee10509@ec2-54-243-49-82.compute-1.amazonaws.com:5432/dfhtvgrd27av3s"
var client = new pg.Client({
  connectionString: conString,
  ssl: true,
});
client.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT * FROM userstest', (err, res) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(res.rows);
    client.end();
    })
});

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
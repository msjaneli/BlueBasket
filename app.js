var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Get on "/" route!');
  });

  app.listen(8080, function() {
    console.log('Blue basket web app "back-end" on 8080!');
  });
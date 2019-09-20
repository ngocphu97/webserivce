var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');

var connection = require('./connection');
var routes = require('./routes');

const fileUpload = require('express-fileupload');

var app = express();

app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(fileUpload());

connection.init();
routes.configure(app);  

var server = app.listen(3000, function() {
  console.log('Server listening on port ' + server.address().port);
});


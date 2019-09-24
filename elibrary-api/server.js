const express = require('express');

const bodyparser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const connection = require('./connection');
const api = require('./api');

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());

connection.init();

/**
 * Setup Routes
 */
api(app);

let server = app.listen(3000, function () {
  console.log('Server listening on port ' + server.address().port);
});


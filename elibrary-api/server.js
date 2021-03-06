const express = require('express');

const cors = require('cors');
const bodyparser = require('body-parser');
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

const server = app.listen(3000, function () {
  console.log('Server listening on port ' + server.address().port);
});

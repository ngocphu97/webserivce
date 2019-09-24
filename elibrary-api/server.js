let express = require('express');

let bodyparser = require('body-parser');
let cors = require('cors');
let fileUpload = require('express-fileupload');

let connection = require('./connection');
let routes = require('./routes');

let app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(fileUpload());

connection.init();
routes.configure(app);

let server = app.listen(3000, function () {
  console.log('Server listening on port ' + server.address().port);
});

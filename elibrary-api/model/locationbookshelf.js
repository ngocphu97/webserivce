let connection = require('../connection');

let queryDB = (connection, response, query, fieldData) => {
  connection.acquire((error, connection) => {
    if (error) {
      response.send(error);
    } else {
      connection.query(query, fieldData, (error, result) => {
        if (error) {
          response.send(error);
        } else {
          connection.release();
          response.send(result);
        }
      }, (error) => {
        response.send(error);
      });
    }
  });
}

function LocationBookshelf() {

  this.getLocation = (response) => {
    const locationQuery = 'SELECT id, name FROM `booshelf_location`';
		queryDB(connection, response, locationQuery, '');
  };

  this.getLocationFromSKU = (reqeset, response) => {
    const locationQuery = 'SELECT sku, books.name, bl.name, x, y '
      + 'FROM bookshelf_location_entity be '
      + 'LEFT JOIN books ON be.book_id = books.id '
      + 'LEFT JOIN booshelf_location bl ON be.bookshelf_id = bl.id '
      + 'WHERE books.sku=?;';
    queryDB(connection, response, locationQuery, reqeset.sku);
  };

  this.createLocation = (fieldData, response) => {
    const locationQuery = 'insert into bookshelf_location_entity set ?';
    queryDB(connection, response, locationQuery, fieldData);
  };
}

module.exports = new LocationBookshelf();

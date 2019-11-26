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
    const locationQuery = 'SELECT id as locationId, name, area, decription as description FROM booshelf_location';
    queryDB(connection, response, locationQuery, '');
  };

  this.getLocationFromSKU = (request, response) => {
    const locationQuery =
        'SELECT bl.name, x, y '
      + 'FROM bookshelf_location_entity be '
      + 'LEFT JOIN books ON be.book_id = books.id '
      + 'LEFT JOIN booshelf_location bl ON be.bookshelf_id = bl.id '
      + 'WHERE books.sku = ?';
    queryDB(connection, response, locationQuery, request.sku);

     
  };

  this.createLocation = (fieldData, response) => {
    const locationQuery = 'insert into bookshelf_location_entity set ?';
    queryDB(connection, response, locationQuery, [fieldData]);
  };

  this.updateLocation = (fieldData, response) => {

    connection.acquire((error, connection) => {
      if (error) {
        response.send(error);
      } else {
        connection.query(`select * from bookshelf_location_entity WHERE book_id = ${fieldData.book_id}`, '', (error, result) => {
          if (error) {
            response.send(error);
          } else {
            if (result.length === 0) {
              const locationQuery = `insert bookshelf_location_entity SET ?`;
              connection.query(locationQuery, [fieldData], (error, result) => {
                if (error) {
                  response.send(error);
                } else {
                  connection.release();
                  response.send(result);
                }
              });

            } else {
              const locationQuery = `update bookshelf_location_entity SET bookshelf_id = ? WHERE book_id = ${fieldData.book_id}`;
              connection.query(locationQuery, [fieldData], (error, result) => {
                if (error) {
                  response.send(error);
                } else {
                  connection.release();
                  response.send(result);
                }
              });
            }
          }
        }, (error) => {
          response.send(error);
        });
      }
    });

  };


}

module.exports = new LocationBookshelf();

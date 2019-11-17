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

let querySearch = (connection, response, query, fieldData, page) => {
  var page = (page < 1 ? 1 : page) || 1;
  var items = 12;
  var indexStart, indexEnd;
  indexStart = (page - 1) * items;
  indexEnd = indexStart + items;
  connection.acquire((error, connection) => {
    if (error) {
      response.send(error);
    } else {
      connection.query(query, fieldData, (error, result) => {
        if (error) {
          response.send(error);
        } else {
          connection.release();
          response.send(result.slice(indexStart, indexEnd));
        }
      }, (error) => {
        response.send(error);
      });
    }
  });
}

function Covers() {

  this.createCover = (fieldData, response) => {
    const bookQuery = 'insert into cover set ?';
    queryDB(connection, response, bookQuery, fieldData);
  };

  this.updateCover = (fieldData, bookId, response) => {
    const bookQuery = 'UPDATE cover set ? WHERE bookId=?';
    queryDB(connection, response, bookQuery, [fieldData, bookId.bookId]);
  };

  this.getBookCover = (request, response) => {
    const bookQuery = 'select * from cover where bookId = ?';
    queryDB(connection, response, bookQuery, request.bookId);
  }
}

module.exports = new Covers();

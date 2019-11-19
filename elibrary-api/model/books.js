let connection = require('../connection');

let queryDB = (connection, response, query, fieldData) => {
  connection.acquire((error, connection) => {
    if (error) {
      response.send(error);
    } else {
      connection.query(query, fieldData, (error, result) => {
        console.log('Log Message: queryDB -> fieldData', fieldData);
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

function Books() {

  this.getBooks = (request, response) => {
    let bookQuery = '';
    if (request && request.query.cover) {
      bookQuery = `select * from books`;
    } else {
      bookQuery = `SELECT books.id, sku, category_id, name, author, cost, retailPrice, amount, inventory, distributor, language, size, totalPage, translator, publishDate, description, cover.photo  FROM books LEFT JOIN cover ON books.id = cover.bookId`;
    }
    queryDB(connection, response, bookQuery, '');
  };

  this.createBook = (fieldData, response) => {
    const bookQuery = 'insert into books set ?';
    queryDB(connection, response, bookQuery, fieldData);
  };

  this.searchBooks = (query, response) => {
    const bookQuery = `SELECT sku, name, author, cost, retailPrice, amount, inventory, distributor, language, size, totalPage, translator, publishDate, description, cover.photo FROM books LEFT JOIN cover ON books.id = cover.bookId WHERE books.name LIKE '%${query.searchKey}%';`;
    querySearch(connection, response, bookQuery, query.searchKey, query.page);
  };

  this.getBookById = (reqeset, response) => {
    const bookQuery = 'select * from books where id = ?';
    queryDB(connection, response, bookQuery, reqeset.id);
  };

  this.getMostSearchForTimeLine = (reqeset, response) => {
    const bookQuery = `SELECT sku, name, date_search, COUNT(sku) AS NumberOfSearch
                        FROM history_search
                        GROUP BY sku
                        HAVING date_search > DATE_SUB(CURRENT_DATE(), INTERVAL ? DAY)
                        ORDER BY COUNT(sku) DESC
                        LIMIT 5`;
    queryDB(connection, response, bookQuery, reqeset.num_days);
  };

  this.getLocationFromSKU = (reqeset, response) => {
    const bookQuery = 'SELECT sku, books.name, bl.name, x, y '
      + 'FROM bookshelf_location_entity be '
      + 'LEFT JOIN books ON be.book_id = books.id '
      + 'LEFT JOIN booshelf_location bl ON be.bookshelf_id = bl.id '
      + 'WHERE books.sku=?;';
    queryDB(connection, response, bookQuery, reqeset.sku);
  };

  this.getBookByCategory = (reqeset, response) => {
    const bookQuery = 'SELECT sku, name, author, cost, retailPrice, amount, inventory FROM `books` WHERE category_id = ?';
    queryDB(connection, response, bookQuery, reqeset.categoryId);
  };

  this.getRelateBook = (request, response) => {
    const bookQuery = 
    `SELECT sku, name, author, cost, retailPrice, amount, inventory, distributor, language, size, totalPage, translator, publishDate, description, cover.photo FROM books
    LEFT JOIN cover ON books.id = cover.bookId
    WHERE category_id in (SELECT category_id FROM books WHERE sku = ?)
    LIMIT 10;`;
    queryDB(connection, response, bookQuery, request.sku);
  };

  this.updateBook = (fieldData, response) => {
    const bookQuery = 'update books set ? where id = ?';
    queryDB(connection, response, bookQuery, [fieldData, fieldData.id]);
  };

  this.deleteBook = (fieldData, response) => {
    const bookQuery = 'delete from books where id = ?';
    queryDB(connection, response, bookQuery, fieldData.id);
  };

  this.uploadBookCover = (request, response) => {

    if (!request.files || Object.keys(request.files).length === 0) {
      return res.status(400).send({ mess: '' });
    }

    let sampleFile = request.files.image;

    const fieldData = {
      bookId: 1,
      photo: sampleFile.data
    }

    const bookQuery = 'insert into cover set ?';
    queryDB(connection, response, bookQuery, fieldData);
  }

  this.uploadBookCoverPhoto = (request, response) => {
    const bookQuery = 'insert into book_cover set photo = ?, sku = ?, book_id = ?';
    queryDB(connection, response, bookQuery, [request.photo, request.sku, request.bookId]);
  }

  this.getBookCover = (request, response) => {
    const bookQuery = 'select * from cover where bookId = ?';
    queryDB(connection, response, bookQuery, request.bookId);
  }
}

module.exports = new Books();

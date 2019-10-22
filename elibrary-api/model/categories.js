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

function Categories() {

	this.getCategoriess = (response) => {
    const categoriesQuery = 'select * from 	categories';
		queryDB(connection, response, categoriesQuery, '');
  };

  this.getCategoryForAmount = (response) => {
    const categoriesQuery = 'SELECT categories.name, SUM(books.amount) AS NumberOfBooks FROM categories JOIN books ON categories.id = books.category_id GROUP BY categories.name';
		queryDB(connection, response, categoriesQuery, '');
  };

	this.createCategories = (fieldData, response) => {
    const categoriesQuery = 'insert into categories set ?';
		queryDB(connection, response, categoriesQuery, fieldData);
	};

	this.getCategoriesById = (reqeset, response) => {
    const categoriesQuery = 'select * from categories where id = ?';
		queryDB(connection, response, categoriesQuery, reqeset.id);
	};

	this.updateCategories = (fieldData, response) => {
    const categoriesQuery = 'update categories set ? where id = ?';
		queryDB(connection, response, categoriesQuery, [fieldData, fieldData.id]);
	};

	this.deleteCategories = (fieldData, response) => {
    const categoriesQuery = 'delete from categories where id = ?';
		queryDB(connection, response, categoriesQuery, fieldData.id);
	};
}

module.exports = new Categories();

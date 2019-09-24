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

function Books() {

	this.getBooks = (response) => {
		const bookQuery = 'SELECT * FROM books';
		queryDB(connection, response, bookQuery, '');
	};

	this.createBook = (fieldData, response) => {
		const bookQuery = 'insert into books set ?';
		queryDB(connection, response, bookQuery, fieldData);
	};

	this.getBookById = (reqeset, response) => {
		const bookQuery = 'select * from books where id = ?';
		queryDB(connection, response, bookQuery, reqeset.id);
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
			return res.status(400).send('No files were uploaded.');
		}

		let sampleFile = request.files.image;

		const fieldData = {
			bookId: 1,
			photo: sampleFile.data
		}

		const bookQuery = 'insert into cover set ?';
		queryDB(connection, response, bookQuery, fieldData);
	}

	this.getBookCover = (request, response) => {
		const bookQuery = 'select * from cover where bookId = ?';
		queryDB(connection, response, bookQuery, request.bookId);
	}
}

module.exports = new Books();	
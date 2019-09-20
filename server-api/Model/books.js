var connection = require('../connection');

function Books() {

	this.get = (response) => {
		connection.acquire((error, connection) => {
			if (error) {
				response.send(error)
			} else {
				connection.query('SELECT * FROM books', (error, result) => {
					if (error) {
						response.send(error)
					} else {
						connection.release();
						response.send(result);
					}
				}, (error) => {
					response.send(error)
				});
			}
		});
	};

	this.xxx = (field_data, res) => {
		console.log('vo day 1');
		// connection.acquire((err, connection) => {
		// 	connection.query('insert into books set ?', field_data, (err, result) => {
		// 		if (err) {
		// 			throw err
		// 		} else {
		// 			connection.release();
		// 			res.send({ status: 0, message: 'Book created successfully' });
		// 		}
		// 	});
		// });
	};

	this.read = (reqeset, res) => {
		connection.acquire(function (err, connection) {
			connection.query('select * from books where id=?', reqeset.id, function (err, result) {
				connection.release();
				res.send(result);
			});
		});
	};

	this.update = (field_data, res) => {
		connection.acquire(function (err, con) {
			con.query('update books set ? where id = ?', [field_data, field_data.id], function (err, result) {
				con.release();
				if (err) {
					res.send({ status: 1, message: 'Book update failed' });
				} else {
					res.send({ status: 0, message: 'Book updated successfully' });
				}
			});
		});
	};

	this.create = (req, res) => {
		console.log('vo day');
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).send('No files were uploaded.');
		}

		let sampleFile = req.files.image;

		sampleFile.mv('D:/Projects/school/webserivce/server-api/images/filename.jpg', function (err) {
			if (err)
				return res.status(500).send(err);

			res.send('File uploaded!');
		});
	}
}

module.exports = new Books();	
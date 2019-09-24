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

function Users() {
	this.getUsers = (response) => {
		const usersQuery = 'select * from users';
		queryDB(connection, response, usersQuery, '');
	};
}

module.exports = new Users();	
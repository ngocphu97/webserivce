const booksRoutes = require('./books');
const usersRoutes = require('./users');

const api = ((app) => {
	app.use('/books', booksRoutes);
	app.use('/users', usersRoutes);
});

module.exports = api;

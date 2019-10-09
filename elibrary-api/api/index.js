const booksRoutes = require('./books');
const usersRoutes = require('./users');
const categoriesRoutes = require('./categories');

const api = ((app) => {
	app.use('/books', booksRoutes);
	app.use('/users', usersRoutes);
  app.use('/categories', categoriesRoutes);
});

module.exports = api;

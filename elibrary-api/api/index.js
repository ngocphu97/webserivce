const booksRoutes = require('./books');
const usersRoutes = require('./users');
const categoriesRoutes = require('./categories');
const coversRoutes = require('./covers');
const locationbookshelfRoutes = require('./locationbookshelf');

const api = ((app) => {
	app.use('/books', booksRoutes);
	app.use('/users', usersRoutes);
  app.use('/categories', categoriesRoutes);
  app.use('/covers', coversRoutes);
  app.use('/locationbookshelf', locationbookshelfRoutes);
});

module.exports = api;

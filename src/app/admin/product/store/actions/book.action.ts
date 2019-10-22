import { createAction, props } from '@ngrx/store';

import { Book, AddBook } from '../../models/book.model';

export const getBookList = createAction(
	'[Book] Get Book List'
);

export const getBookListSuccess = createAction(
	'[Book] Get Book List Success',
	props<{ bookList: any }>()
);

export const getBookListFail = createAction(
	'[Book] Get Book List Fail',
	props<{ error: any }>()
);

export const addBook = createAction(
	'[Book] Add New Book',
	props<{ book: AddBook }>()
);

export const addBookSuccess = createAction(
	'[Book] Add New Book Success',
	props<{ book: Book }>()
);

export const addBookFail = createAction(
	'[Book] Add New Book Fail',
	props<{ error: any }>()
);

export const getBookById = createAction(
	'[Book] Get Book By Id',
	props<{ bookId: string }>()
);

export const getBookByIdSuccess = createAction(
	'[Book] Get Book By Id Success',
	props<{ book: Book }>()
);

export const getBookByIdFail = createAction(
	'[Book] Get Book By Id Fail',
	props<{ error: any }>()
);

export const getBookByCategoryId = createAction(
  '[Book] Get Book Category Id',
  props<{ categoryId: number }>()
);

export const getBookByCategoryIdSuccess = createAction(
  '[Book] Get Book By Category Success',
  props<{ book: Book }>()
);

export const getBookByCategoryIdFail = createAction(
  '[Book] Get Book By Category Fail',
  props<{ error: any }>()
);


export const updateBookById = createAction(
	'[Book] Update Book By Id',
	props<{ book: Book }>()
);

export const updateBookByIdSuccess = createAction(
	'[Book] Update Book By Id Success',
	props<{ book: Book }>()
);

export const updateBookByIdFail = createAction(
	'[Book] Update Book By Id Fail',
	props<{ error: any }>()
);


export const deleteBook = createAction(
	'[Book] Delete book',
	props<{ book: Book }>()
);

export const deleteBookSuccess = createAction(
	'[Book] Delete book success',
	props<{ bookId: string }>()
);

export const deleteBookError = createAction(
	'[Book] Delete book fail',
	props<{ error: any }>()
);

export const getTopSearchBooksByTime = createAction(
  '[Book] Get top search book',
  props<{ time: number }>()
);

export const getTopSearchBooksByTimeSuccess = createAction(
  '[Book] Get top search book success',
  props<{ topBooks: Array<Book> }>()
);

export const getTopSearchBooksByTimeFail = createAction(
  '[Book] Get top search book fail',
  props<{ error: any }>()
);


export enum ExploreActionTypes {
	GET_BOOK_LIST = '[Book] Get Book List',
	GET_BOOK_SUCCESS = '[Book] Get Book List Success',
	GET_BOOK_FAILURE = '[Book] Get Book List Fail',

	ADD_BOOK = '[Book] Add Book',
	ADD_BOOK_SUCCESS = '[Book] Add Book Success',
	ADD_BOOK_FAIL = '[Book] Add Book Fail',

	GET_BOOK_BY_ID = '[Book] Get Book By Id',
	GET_BOOK_BY_ID_SUCCESS = '[Book] Get Book By Id Success',
	GET_BOOK_BY_ID_FAIL = '[Book] Get Book By Id Fail',

	DELETE_BOOK = '[Book] Delete Book',
	DELETE_BOOK_SUCCESS = '[Book] Delete Book Success',
	DELETE_BOOK_FAIL = '[Book] Delete Book Fail',

}
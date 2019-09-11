import { createAction, props } from '@ngrx/store';

import { Book } from '../../models/book.model';

export const getBookList = createAction(
	'[Book] Get Book List'
);

export const getBookListSuccess = createAction(
	'[Book] Get Book List Success',
	props<{ bookList: Array<Book> }>()
);

export const getBookListFail = createAction(
	'[Book] Get Book List Fail',
	props<{ error: any }>()
);

export const addBook = createAction(
	'[Book] Add New Book',
	props<{ book: Book }>()
);

export const addBookSuccess = createAction(
	'[Book] Add New Book Success',
	props<{ book: Book }>()
);

export const addBookFail = createAction(
	'[Book] Add New Book Fail',
	props<{ error: any }>()
);

export enum ExploreActionTypes {
	GET_BOOK_LIST = '[Book] Get Book List',
	GET_BOOK_SUCCESS = '[Book] Get Book List Success',
	GET_BOOK_FAILURE = '[Book] Get Book List Fail',

	ADD_BOOK = '[Book] Add Book',
	ADD_BOOK_SUCCESS = '[Book] Add Book Success',
	ADD_BOOK_FAIL = '[Book] Add Book Fail',
}
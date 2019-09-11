import { Action, createReducer, on } from '@ngrx/store';

import * as BookActions from '../actions/book.action';
import { Book } from '../../models/book.model';

export interface BookState {
	error: any | null;
	pending: boolean;
	bookList: Array<Book> | null;
	selectedBook: Book | null
}

export const initialState: BookState = {
	error: undefined,
	pending: false,
	bookList: undefined,
	selectedBook: undefined
};

const bookReducer = createReducer(
	initialState,
	on(BookActions.getBookList, (state) => ({
		...state,
		error: null,
		pending: true
	})),

	on(BookActions.getBookListSuccess, (state, { bookList }) => ({
		...state,
		error: null,
		pending: false,
		bookList: bookList
	})),

	on(BookActions.getBookListFail, (state, { error }) => ({
		...state,
		pending: false,
		error: error,
	})),

	on(BookActions.addBookSuccess, (state, { book }) => ({
		...state,
		error: null,
		pending: false,
		bookList: [
			...state.bookList,
			book
		]
	})),

	on(BookActions.addBookFail, (state, { error }) => ({
		...state,
		pending: false,
		error: error,
	})),

	on(BookActions.getBookByIdSuccess, (state, { book }) => ({
		...state,
		pending: false,
		error: false,
		selectedBook: book
	})),
);

export function reducer(state: BookState | undefined, action: Action) {
	return bookReducer(state, action);
}

import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as BookActions from '../actions/book.action';
import { Book } from '../../models/book.model';

export interface State extends EntityState<Book> {
	selectedBookId: string | null;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: State = adapter.getInitialState({
	selectedBookId: undefined
});

const bookReducer = createReducer(
	initialState,

	on(BookActions.getBookList, (state) => ({
		...state,
		error: null,
		pending: true
	})),

	on(BookActions.getBookById, (state, { bookId }) => {
		return { ...state, selectedBookId: bookId };
	}),

	on(BookActions.getBookListSuccess, (state, { bookList }) => {
		return adapter.addAll(bookList, state);
	}),

	on(BookActions.addBookSuccess, (state, { book }) => {
		return adapter.addOne(book, state);
	}),

	on(BookActions.deleteBookSuccess, (state, { bookId }) => {
		return adapter.removeOne(bookId, state);
	}),

);

export function reducer(state: State | undefined, action: Action) {
	return bookReducer(state, action);
}

export const getSelectedBookId = (state: State) => state.selectedBookId;

const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = adapter.getSelectors();

export const selectBookIds = selectIds;
export const selectBookEntities = selectEntities;
export const selectAllBooks = selectAll;
export const selectBookTotal = selectTotal;


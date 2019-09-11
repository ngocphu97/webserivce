import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BookState } from '../reducers/book.reducer';
import { Book } from '../../models/book.model';

export const selectBookState = createFeatureSelector<BookState>('book');

export const selectBookList = createSelector(
	selectBookState,
	(state: BookState): Array<Book> => state.bookList
);

export const selectBookPending = createSelector(
	selectBookState,
	(state: BookState): boolean => state.pending
);

export const selectSelectedBook = createSelector(
	selectBookState,
	(state: BookState): Book => state.selectedBook
);

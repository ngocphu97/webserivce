import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';

export const selectBookState = createFeatureSelector<fromReducer.State>('book');

export const selectBookList = createSelector(
	selectBookState,
	fromReducer.selectAllBooks
);

export const selectBookEntities = createSelector(
	selectBookState,
	fromReducer.selectBookEntities
);

export const selectSelectedBookId = createSelector(
	selectBookState,
	fromReducer.getSelectedBookId
);

export const selectCurrentBook = createSelector(
	selectBookEntities,
	selectSelectedBookId,
	(bookEntities, bookId) => {
		console.log(bookEntities);
		return bookEntities[bookId]
	}
);
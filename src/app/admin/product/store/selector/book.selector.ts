import { createSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';
import { AdminState, selectAdminState } from 'src/app/admin/reducers';

export const selectBookState = createSelector(
  selectAdminState,
  (state: AdminState) => state.books
);

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
		return bookEntities[bookId]
	}
);

export const selectTopSearch = createSelector(
  selectBookState,
  fromReducer.getSelectedTopSearch
)

export const selectBookLocationBySku = createSelector(
  selectBookState,
  fromReducer.getSelectBookLocation
)

export const selectLoading = createSelector(
  selectBookState,
  fromReducer.getSelectedLoading
)

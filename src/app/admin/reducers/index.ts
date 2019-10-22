import { Action, combineReducers, createFeatureSelector } from '@ngrx/store';

import * as fromBooks from '../product/store/reducers';
import * as fromCategories from '../dashboard/store/category/category.reducer';

export interface AdminState {
  books: fromBooks.State;
  categories: fromCategories.State;
}

export function adminReducer(state: AdminState | undefined, action: Action) {
  return combineReducers({
    ['books']: fromBooks.bookReducer,
    ['categories']: fromCategories.categoriesReducer,
  })(state, action);
}

export const selectAdminState = createFeatureSelector<AdminState>('admin');

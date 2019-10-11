import { Action, combineReducers, createFeatureSelector } from '@ngrx/store';

import * as fromBooks from '../product/store/reducers';
import * as fromDashboard from '../dashboard/store/categories.reducer';

export interface AdminState {
  books: fromBooks.State;
  categories: fromDashboard.State;
}

export function adminReducer(state: AdminState | undefined, action: Action) {
  return combineReducers({
    ['books']: fromBooks.bookReducer,
    ['categories']: fromDashboard.categoriesReducer,
  })(state, action);
}

export const selectAdminState = createFeatureSelector<AdminState>('admin');

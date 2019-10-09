import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CategoriesActions from './categories.actions';
import { Categories } from '../product/models/categories.model';

export interface State extends EntityState<Categories> {
  selectedCategoriesId: number | null;
}

export const catAdapter: EntityAdapter<Categories> = createEntityAdapter<Categories>();

export const initialState: State = catAdapter.getInitialState({
  selectedCategoriesId: undefined
});

const categoriesReducer = createReducer(
  initialState,

  on(CategoriesActions.getCategoriesList, (state) => ({
    ...state,
    error: null,
    pending: true
  })),

  on(CategoriesActions.getCategoriesListSuccess, (state, { categoriesList }) => {
    return catAdapter.addAll(categoriesList, state);
  }),

);

export function reducer(state: State | undefined, action: Action) {
  return categoriesReducer(state, action);
}

export const getSelectedCategoriesId = (state: State) => {
  return state.selectedCategoriesId
};

const {
  // selectIds,
  // selectEntities,
  selectAll,
  selectTotal,
} = catAdapter.getSelectors();

// export const selectCategoriesIds = selectIds;
// export const selectCategoriesEntities = selectEntities;
export const selectAllCategories = selectAll;
export const selectCategoriesTotal = selectTotal;


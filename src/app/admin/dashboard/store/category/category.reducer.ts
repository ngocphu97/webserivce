import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CategoriesActions from './category.actions';
import { Categories } from '../../models/categories.model';

export interface State extends EntityState<Categories> {
  selectedCategoriesId: number | null;
  categoryForAmountList: Array<any> | null;
}

export const adapter: EntityAdapter<Categories> = createEntityAdapter<Categories>();

export const initialState: State = adapter.getInitialState({
  selectedCategoriesId: null,
  categoryForAmountList: null
});

export const categoriesReducer = createReducer(
  initialState,

  on(CategoriesActions.getCategoriesList, (state) => ({
    ...state,
    error: null,
    pending: true
  })),

  on(CategoriesActions.getCategoriesListSuccess, (state, { categoriesList }) => {
    return adapter.addAll(categoriesList, state);
  }),

  on(CategoriesActions.getCategoryForAmountSuccess, (state, { categoryForAmountList }) => {
    return {
      ...state,
      categoryForAmountList: categoryForAmountList
    }
  }),

);

export function reducer(state: State | undefined, action: Action) {
  return categoriesReducer(state, action);
}

export const getSelectedCategoriesId = (state: State) => state.selectedCategoriesId;
export const getSelectedCategoryForAmount = (state: State) => state.categoryForAmountList;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectCatIds = selectIds;
export const selectCatEntities = selectEntities;
export const selectAllCat = selectAll;
export const selectCatTotal = selectTotal;


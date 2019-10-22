import { createSelector } from '@ngrx/store';

import * as fromReducer from './category.reducer';
import { selectAdminState, AdminState } from '../../../reducers';

export const selectCategoriesState = createSelector(
  selectAdminState,
  (state: AdminState) => state.categories
);

export const selectCategoriesEntities = createSelector(
  selectCategoriesState,
  fromReducer.selectCatEntities
);

export const selectCategoriesList = createSelector(
  selectCategoriesState,
  fromReducer.selectAllCat
);

export const selectSelectedCategoriesId = createSelector(
  selectCategoriesState,
  fromReducer.getSelectedCategoriesId
);

export const selectCurrentCategories = createSelector(
  selectCategoriesEntities,
  selectSelectedCategoriesId,
  (categoriesEntities, catId) => {
    return categoriesEntities[catId]
  }
);
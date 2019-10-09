import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducer from './categories.reducer';

export const selectCategoriesState = createFeatureSelector<fromReducer.State>('categories');

export const selectCategoriesList = createSelector(
  selectCategoriesState,
  fromReducer.selectAllCategories
);

// export const selectCategoriesEntities = createSelector(
//   selectCategoriesState,
//   fromReducer.selectCategoriesEntities
// );

// export const selectSelectedCategoriesId = createSelector(
//   selectCategoriesState,
//   fromReducer.getSelectedCategoriesId
// );

// export const selectCurrentCategories = createSelector(
//   selectCategoriesEntities,
//   selectSelectedCategoriesId,
//   (categoriesEntities, catId) => {
//     return categoriesEntities[catId]
//   }
// );
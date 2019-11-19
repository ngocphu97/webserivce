import { createAction, props } from '@ngrx/store';

export const getCategoriesList = createAction(
  '[Categories] Get Categories List'
);

export const getCategoriesListSuccess = createAction(
  '[Categories] Get Categories List Success',
  props<{ categoriesList: Array<any> }>()
);

export const getCategoriesListFail = createAction(
  '[Categories] Get Categories List Fail',
  props<{ error: any }>()
);

export const getCategoryForAmount = createAction(
  '[Categories] Get Categories For Amount',
);

export const getCategoryForAmountSuccess = createAction(
  '[Categories] Get Categories For Amount Success',
  props<{ categoryForAmountList: Array<any> }>()
);

export const getCategoryForAmountFail = createAction(
  '[Categories] Get Categories For Amount Fail',
  props<{ error: any }>()
);


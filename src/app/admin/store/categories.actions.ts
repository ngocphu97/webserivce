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

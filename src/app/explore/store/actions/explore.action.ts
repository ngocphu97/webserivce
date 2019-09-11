import { createAction, props } from '@ngrx/store';

import { Search, ExploreModel } from '../../models';

export const getExploreList = createAction(
  '[Explore] Get Explore',
  props<{ search: Search }>()
);

export const getExploreListSuccessfully = createAction(
  '[Explore] Get Explore successfully',
  props<{ exploredList: Array<ExploreModel> }>()
);

export const getExploreListFailure = createAction(
  '[Explore] Get Explore failure',
  props<{ error: any }>()
);

export enum ExploreActionTypes {
  GET_EXPLORE = '[Explore] Get Explore',
  GET_EXPLORE_SUCCESSFULLY = '[Explore] Get Explore successfully',
  GET_EXPLORE_FAILURE = '[Explore] Get Explore failure'
}
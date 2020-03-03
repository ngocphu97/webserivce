import { createAction, props } from '@ngrx/store';

import { Search, ExploreModel, AdSuggestion } from '../../models';

export const getExploreList = createAction(
  '[Explore] Get Explore',
  props<{ search: Search }>()
);

export const getExploreListSuccessfully = createAction(
  '[Explore] Get Explore Successfully',
  props<{ exploredList: Array<ExploreModel> }>()
);

export const getExploreListFailure = createAction(
  '[Explore] Get Explore Failure',
  props<{ error: any }>()
);

export const getAdSuggestionList = createAction(
  '[Explore] Get Ad Interest Suggestion List',
  props<{ search: Search }>()
);

export const getAdSuggestionListSuccessfully = createAction(
  '[Explore] Get Ad Interest Suggestion Successfully',
  props<{ adSuggestionList: Array<AdSuggestion> }>()
);

export const getAdSuggestionListFailure = createAction(
  '[Explore] Get Ad Interest Suggestion Failure',
  props<{ error: any }>()
);

export enum ExploreActionTypes {
  GET_EXPLORE = '[Explore] Get Explore',
  GET_EXPLORE_SUCCESSFULLY = '[Explore] Get Explore successfully',
  GET_EXPLORE_FAILURE = '[Explore] Get Explore failure'
}

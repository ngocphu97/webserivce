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


export const getName = createAction(
  '[Explore] Get Name',
  props<{ name: string }>()
);

export const getNameSuccess = createAction(
  '[Explore] Get Name Success',
  props<{  }>()
);

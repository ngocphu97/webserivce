import { Action, createReducer, on } from '@ngrx/store';

import * as ExploreAction from '../actions/explore.action';
import { Search, ExploreModel, AdSuggestion } from '../../models';

export interface ExploreState {
  error: any | null;
  pending: boolean;
  search: Search | null;
  exploredList: Array<ExploreModel> | null;
  adSuggestionList: Array<AdSuggestion> | null;
  totalExplore: number | null;
}

export const initialState: ExploreState = {
  error: undefined,
  pending: false,
  search: undefined,
  exploredList: undefined,
  adSuggestionList: undefined,
  totalExplore: 0
};

const exploreReducer = createReducer(
  initialState,

  on(ExploreAction.getExploreList,
    ExploreAction.getAdSuggestionList,
    (state, { search }) => {
      return {
        ...state,
        error: null,
        pending: true,
        search: search
      }
    }
  ),

  on(ExploreAction.getExploreListSuccessfully, (state, { exploredList }) => ({
    ...state,
    error: null,
    pending: false,
    exploredList: exploredList,
    totalExplore: exploredList.length
  })),

  on(ExploreAction.getAdSuggestionListSuccessfully, (state, { adSuggestionList }) => ({
    ...state,
    error: null,
    pending: false,
    adSuggestionList: adSuggestionList,
    totalExplore: adSuggestionList.length
  })),
);

export function reducer(state: ExploreState | undefined, action: Action) {
  return exploreReducer(state, action);
}

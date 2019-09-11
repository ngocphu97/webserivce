import { Action, createReducer, on } from '@ngrx/store';

import * as ExploreAction from '../actions/explore.action';
import { Search, ExploreModel } from '../../models';

export interface ExploreState {
  error: any | null;
  pending: boolean;
  search: Search | null;
  exploredList: Array<ExploreModel> | null;
  totalExplore: number | null;
}

export const initialState: ExploreState = {
  error: undefined,
  pending: false,
  search: undefined,
  exploredList: undefined,
  totalExplore: undefined
};

const exploreReducer = createReducer(
  initialState,
  on(ExploreAction.getExploreList, (state, { search }) => ({
    ...state,
    error: null,
    pending: true,
    search: search
  })),
  on(ExploreAction.getExploreListSuccessfully, (state, { exploredList }) => ({
    ...state,
    error: null,
    pending: false,
    exploredList: exploredList
  }))
);

export function reducer(state: ExploreState | undefined, action: Action) {
  return exploreReducer(state, action);
}

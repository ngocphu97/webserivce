import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ExploreState } from '..';
import { ExploreModel } from '../../models';

export const selectExploreState = createFeatureSelector<ExploreState>('explore');

export const selectAllExplore = createSelector(
  selectExploreState,
  (state): Array<ExploreModel> => state.exploredList
);

export const selectTotalExplore = createSelector(
  selectExploreState,
  (state): number => state.totalExplore
)

export const selectExplorePending = createSelector(
  selectExploreState,
  (state): boolean => state.pending
);

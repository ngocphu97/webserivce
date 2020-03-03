import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ManageState } from '..';
import { User } from '../../models/user.model';

export const selectManageState = createFeatureSelector<ManageState>('manage');

export const selectUsers = createSelector(
  selectManageState,
  (state): Array<User> => state.users
);

export const selectPending = createSelector(
  selectManageState,
  (state): boolean => state.pending
);

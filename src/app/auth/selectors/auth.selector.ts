import { createSelector } from '@ngrx/store';

import { AuthToken } from '../models';
import { selectAuthState, AuthState } from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const selectLoggedInUser = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedInUser
);

export const selectAuthToken = createSelector(
  selectAuthStatusState,
  fromAuth.getAuthToken
);

export const selectIsAuthenticated = createSelector(
  selectAuthToken,
  (authToken: AuthToken): boolean => {
    return authToken && AuthToken.isValid(authToken);
  }
);

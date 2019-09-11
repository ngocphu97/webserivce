import { createSelector } from '@ngrx/store';

import { AuthState, selectAuthState } from '../reducers';
import * as fromLoginPage from '../reducers/login-page.reducer';

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);

export const selectLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);

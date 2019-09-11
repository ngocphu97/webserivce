import { createSelector } from '@ngrx/store';

import { AuthState, selectAuthState } from '../reducers';
import * as fromResetPasswordPage from '../reducers/reset-password-page.reducer';

export const selectResetPasswordPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.resetPasswordPage
);

export const selectResetPasswordPageError = createSelector(
  selectResetPasswordPageState,
  fromResetPasswordPage.getError
);

export const selectResetPasswordPagePending = createSelector(
  selectResetPasswordPageState,
  fromResetPasswordPage.getPending
);

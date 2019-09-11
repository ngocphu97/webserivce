import { createReducer, on } from '@ngrx/store';

import { HttpError } from '@app/core/exception';
import { ResetPasswordActions } from '../actions';

export const resetPasswordPageFeatureKey = 'resetPasswordPage';

export interface State {
  error: HttpError | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export const reducer = createReducer(
  initialState,

  on(ResetPasswordActions.sendResetPasswordLink, state => ({
    ...state,
    error: null,
    pending: true,
  })),

  on(ResetPasswordActions.sendResetPasswordLinkSuccess, state => ({
    ...state,
    error: null,
    pending: false,
  })),

  on(ResetPasswordActions.sendResetPasswordLinkFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;

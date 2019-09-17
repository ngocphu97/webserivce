import { createReducer, on } from '@ngrx/store';

import { HttpError } from '@app/core/exception';
import { ResetPasswordActions } from '../actions';

export const resetPasswordPageFeatureKey = 'resetPasswordPage';

export interface State {
  error: HttpError | null | string;
  pending: boolean;
  isValidResetPassword: boolean;
  admin: any
}

export const initialState: State = {
  error: null,
  pending: false,
  isValidResetPassword: false,
  admin: undefined
};

export const resetPasswordReducer = createReducer(
  initialState,

  on(ResetPasswordActions.resetPasswordEmail, state => ({
    ...state,
    error: null,
    pending: true
  })),

  on(ResetPasswordActions.resetPasswordEmailVaild, (state, { admin }) => ({
    ...state,
    error: null,
    pending: false,
    isValidResetPassword: true,
    admin: admin
  })),

  on(ResetPasswordActions.resetPasswordEmailInvalid, (state, { error }) => ({
    ...state,
    error: error,
    pending: false,
    isValidResetPassword: false
  })),

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
export const getIsValidResetPassword = (state: State) => state.isValidResetPassword;
export const getValidAdmin = (state: State) => state.admin;

import { createReducer, on } from '@ngrx/store';

import { HttpError } from '@app/core/exception';
import { LoginPageActions, AuthApiActions } from '../actions';

export const loginPageFeatureKey = 'loginPage';

export interface State {
  error: HttpError;
  pending: boolean;
  isApproved: boolean;
}

export const initialState: State = {
  error: undefined,
  pending: undefined,
  isApproved: undefined
};

export const reducer = createReducer(
  initialState,

  on(LoginPageActions.login,
    state => ({
      ...state,
      error: null,
      pending: true,
    })
  ),

  on(LoginPageActions.checkApproved,
    state => ({
      ...state,
      error: null,
      pending: true,
    })
  ),

  on(LoginPageActions.loginFacebook,
    state => ({
      ...state,
      error: null,
      pending: true,
    })
  ),

  on(LoginPageActions.checkApprovedSuccess, (state, { isApproved }) => ({
    ...state,
    isApproved,
    error: null,
    pending: false,
  })),

  on(LoginPageActions.checkApprovedFail, (state, { error }) => {
    return {
      ...state,
      pending: false,
      error: error
    }
  }),

  on(LoginPageActions.leavePage, state => ({
    ...state,
    error: null
  })),

  on(AuthApiActions.loginSuccess, state => ({
    ...state,
    error: null,
    pending: false,
  })),

  on(AuthApiActions.loginFailure, (state, { error }) => {

    return {
      ...state,
      error,
      pending: false,
    }
  }),

  on(AuthApiActions.loginInvalid, (state, { error }) => ({
    ...state,
    error: {
      message: error
    },
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
export const getIsApproved = (state: State) => state.isApproved;

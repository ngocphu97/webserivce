import { createReducer, on } from '@ngrx/store';

import { AuthToken, UserProfile } from '../models';
import { AuthApiActions, AuthActions } from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  authToken: AuthToken;
  loggedInUser: UserProfile;
  error: string;
}

export const initialState: State = {
  authToken: {
    accessToken: undefined,
    expiresIn: undefined,
  },
  loggedInUser: undefined,
  error: undefined
};

export const reducer = createReducer(
  initialState,

  on(AuthApiActions.loginSuccess, (state, { user }) => ({
    ...state,
    loggedInUser: user,
    authToken: {
      accessToken: '12313212312313',
      expiresIn: 9999
    }
  })),
  
  on(AuthApiActions.loginInvalid, (state, { error }) => ({
    ...state,
    error: error
  })),

  on(AuthActions.logout, () => initialState)
);

export const getAuthToken = (state: State) => state.authToken;
export const getLoggedInUser = (state: State) => state.loggedInUser;

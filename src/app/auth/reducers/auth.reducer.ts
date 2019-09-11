import { createReducer, on } from '@ngrx/store';

import { AuthToken, UserProfile } from '../models';
import { AuthApiActions, AuthActions } from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  authToken: AuthToken;
  loggedInUser: UserProfile;
}

export const initialState: State = {
  authToken: {
    accessToken: '123',
    expiresIn: 99999999999
  },
  loggedInUser: {
    id: 'fcad7516-9fec',
    username: 'ponyaim',
    avatarUrl: './assets/images/dev.png'
  }
};

export const reducer = createReducer(
  initialState,

  on(AuthApiActions.loginSuccess, (state, { authToken }) => ({
    ...state,
    authToken
  })),

  on(AuthActions.lock, (state) => ({
    ...state,
    authToken: undefined
  })),

  on(AuthActions.logout, () => initialState)
);

export const getAuthToken = (state: State) => state.authToken;
export const getLoggedInUser = (state: State) => state.loggedInUser;

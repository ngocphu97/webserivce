import { Action, createReducer, on } from '@ngrx/store';

import * as manageAction from '../actions';
import { User } from '../../models/user.model';

export interface ManageState {
  error: any | null;
  pending: boolean;
  users: Array<User>;
}

export const initialState: ManageState = {
  error: undefined,
  pending: false,
  users: undefined
};

const manageReducer = createReducer(
  initialState,

  on(manageAction.getUserList, (state) => ({
    ...state,
    error: null,
    pending: true
  })),

  on(manageAction.getUserListSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null,
    pending: false,
  })),

  on(manageAction.getUserListFail, (state, { error }) => ({
    ...state,
    error,
    pending: false
  })),
);

export function reducer(state: ManageState | undefined, action: Action) {
  return manageReducer(state, action);
}

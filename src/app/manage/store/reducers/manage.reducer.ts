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

  on(manageAction.updateUser, (state) => ({
    ...state,
    pending: true
  })),

  on(manageAction.updateUserSuccess, (state, { user }) => {
    const newUsers = [...state.users];
    let index = newUsers.findIndex(u => u.id === user.id);
    newUsers[index] = user;

    return {
      ...state,
      users: [...newUsers],
      pending: false
    }
  }),

  on(manageAction.addUser, (state) => ({
    ...state,
    pending: true
  })),

  on(manageAction.addUserSuccess, (state, { user }) => ({
    ...state,
    users: [
      ...state.users,
      user
    ],
    pending: false
  })),

  on(manageAction.addUserFail, (state, { error }) => ({
    ...state,
    error,
    pending: false
  })),

  on(manageAction.removeUser, (state) => {
    return {
      ...state,
      pending: true
    }
  }),

  on(manageAction.removeUserSuccess, manageAction.removeUserFail, (state) => {
    return {
      ...state,
      pending: false
    }
  })
);

export function reducer(state: ManageState | undefined, action: Action) {
  return manageReducer(state, action);
}

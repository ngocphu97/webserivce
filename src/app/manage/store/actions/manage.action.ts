import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const getUserList = createAction(
  '[Manage] Get Users'
);

export const getUserListSuccess = createAction(
  '[Manage] Get Users Success',
  props<{ users: Array<User> }>()
);

export const getUserListFail = createAction(
  '[Manage] Get Users Fail',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[Manage] Upadate User ',
  props<{ user: any }>()
);

export const updateUserSuccess = createAction(
  '[Manage] Upadate User Success',
  props<{ user: User }>()
);

export const updateUserFail = createAction(
  '[Manage] Upadate User Fail',
  props<{ error: any }>()
);

export const addUser = createAction(
  '[Manage] Add User ',
  props<{ user: User }>()
);

export const addUserSuccess = createAction(
  '[Manage] Add User Success',
  props<{ user: User }>()
);

export const addUserFail = createAction(
  '[Manage] Add User Fail',
  props<{ error: any }>()
);

export const removeUser = createAction(
  '[Manage] Remove User ',
  props<{ user: User }>()
);

export const removeUserSuccess = createAction(
  '[Manage] Remove User Success',
  props<{ user: User }>()
);

export const removeUserFail = createAction(
  '[Manage] Remove User Fail',
  props<{ error: any }>()
);



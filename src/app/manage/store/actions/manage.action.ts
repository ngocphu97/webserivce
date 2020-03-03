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
  props<{ user: User }>()
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

export const lockUser = createAction(
  '[Manage] Lock User ',
  props<{ user: User }>()
);

export const lockUserSuccess = createAction(
  '[Manage] Lock User Success',
  props<{ user: User }>()
);

export const lockUserFail = createAction(
  '[Manage] Lock User Fail',
  props<{ error: any }>()
);



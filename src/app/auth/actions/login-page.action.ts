import { createAction, props } from '@ngrx/store';

import { Credential } from '../models';
import { HttpError } from '@app/core/exception/http-error';

export const login = createAction(
  '[Login Page] Login',
  props<{ credential: Credential }>()
);

export const checkApproved = createAction(
  '[Login Page] Check is approved',
  props<{ id: number }>()
);

export const checkApprovedSuccess = createAction(
  '[Login Page] Check is approved success',
  props<{ isApproved: boolean }>()
);

export const checkApprovedFail = createAction(
  '[Login Page] Check is approved fail',
  props<{ error: HttpError }>()
);

export const leavePage = createAction(
  '[Login Page] leave page'
);

export const loginGoogle = createAction(
  '[Auth] Login Google'
);

export const loginFacebook = createAction(
  '[Auth] Login Facebook'
);

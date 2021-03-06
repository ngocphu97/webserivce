import { props, createAction } from '@ngrx/store';

import { HttpError } from '@app/core/exception';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: HttpError }>()
);

export const loginInvalid = createAction(
  '[Auth/API] Login Invalid',
  props<{ error: string }>()
);

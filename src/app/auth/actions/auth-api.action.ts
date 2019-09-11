import { props, createAction } from '@ngrx/store';

import { HttpError } from '@app/core/exception';
import { AuthToken } from '../models';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ authToken: AuthToken }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: HttpError }>()
);

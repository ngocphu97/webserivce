import { createAction, props } from '@ngrx/store';

import { HttpError } from '@app/core/exception';

export const sendResetPasswordLink = createAction(
  '[RESET PASSWORD] send reset password link',
  props<{ email: string }>()
);

export const sendResetPasswordLinkSuccess = createAction(
  '[RESET PASSWORD] send reset password link success',
  props<{ response: any }>()
);

export const sendResetPasswordLinkFailure = createAction(
  '[RESET PASSWORD] send reset password link failure',
  props<{ error: HttpError }>()
);

export const resetPassword = createAction(
  '[RESET PASSWORD] reset password',
  props<{ password: string }>()
);

export const resetPasswordSuccess = createAction(
  '[RESET PASSWORD] reset password success',
  props<{ response: any }>()
);

export const resetPasswordFailure = createAction(
  '[RESET PASSWORD] reset password failure',
  props<{ error: HttpError }>()
);

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
  props<{ admin: any }>()
);

export const resetPasswordSuccess = createAction(
  '[RESET PASSWORD] reset password success',
  props<{ response: any }>()
);

export const resetPasswordFailure = createAction(
  '[RESET PASSWORD] reset password failure',
  props<{ error: HttpError }>()
);

export const resetPasswordEmail = createAction(
  '[RESET PASSWORD] Email for reset password',
  props<{ email: string }>()
)

export const resetPasswordEmailInvalid = createAction(
  '[RESET PASSWORD] Email for reset password invalid',
  props<{ error: string }>()
)

export const resetPasswordEmailVaild = createAction(
  '[RESET PASSWORD] Email for reset password vaild',
  props<{ admin: any }>()
)

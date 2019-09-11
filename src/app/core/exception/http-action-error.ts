import { Action } from '@ngrx/store';

import { HttpError } from './http-error';

export interface HttpActionError {
  action: Action;
  error: HttpError;
}

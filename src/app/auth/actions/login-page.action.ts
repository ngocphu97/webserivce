import { createAction, props } from '@ngrx/store';

import { Credential } from '../models';

export const login = createAction(
  '[Login Page] Login',
  props<{ credential: Credential }>()
);

export const leavePage = createAction(
  '[Login Page] leave page'
);

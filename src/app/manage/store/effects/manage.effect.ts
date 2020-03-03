import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import * as manageActions from '../actions'
import { ManageService } from '../services';
import { User } from '../../models/user.model';

@Injectable()
export class ManageEffect {

  getExploredList$ = createEffect(() => this.actions$.pipe(
    ofType(manageActions.getUserList),
    exhaustMap(() => {
      return this.manageService.getUsers().pipe(
        map((users: Array<User>) => {
          return manageActions.getUserListSuccess({ users });
        }),
        catchError(error => of(manageActions.getUserListFail({ error: error }))
        ));
    })
  ));

  constructor(
    private actions$: Actions,
    private manageService: ManageService
  ) { }

}

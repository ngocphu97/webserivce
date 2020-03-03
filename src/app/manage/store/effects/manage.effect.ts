import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import * as manageActions from '../actions'
import { ManageService } from '../services';
import { User } from '../../models/user.model';

@Injectable()
export class ManageEffect {

  getUserList$ = createEffect(() => this.actions$.pipe(
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

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(manageActions.updateUser),
    exhaustMap((action) => {
      return this.manageService.updateUser(action.user).pipe(
        map((user: User) => {
          return manageActions.updateUserSuccess({ user });
        }),
        catchError(error => of(manageActions.updateUserFail({ error: error }))
        ));
    })
  ));

  createNewUser$ = createEffect(() => this.actions$.pipe(
    ofType(manageActions.addUser),
    exhaustMap((action) => {
      return this.manageService.addNewUser(action.user).pipe(
        map((user: User) => {
          return manageActions.addUserSuccess({ user });
        }),
        catchError(error => of(manageActions.addUserFail({ error: error }))
        ));
    })
  ));

  constructor(
    private actions$: Actions,
    private manageService: ManageService
  ) { }

}

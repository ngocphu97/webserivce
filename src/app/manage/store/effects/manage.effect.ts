import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, mapTo } from 'rxjs/operators';

import * as manageActions from '../actions'
import { ManageService } from '../services';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        map((user: any) => {
          return manageActions.updateUserSuccess({ user });
        }),
        catchError(error => {
          this.openSnackBar('Something went wrong', 'Error');
          return of(manageActions.updateUserFail({ error: error }));
        })
      );
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

  removeUser$ = createEffect(() => this.actions$.pipe(
    ofType(manageActions.removeUser),
    exhaustMap((action) => {
      return this.manageService.removeUser(action.user).pipe(
        map((user: User) => {
          return manageActions.removeUserSuccess({ user });
        }),
        catchError(error => of(manageActions.removeUserFail({ error: error }))
        ));
    })
  ));

  removeUserSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(manageActions.removeUserSuccess),
    mapTo(manageActions.getUserList())
  ));

  constructor(
    private actions$: Actions,
    private manageService: ManageService,
    private snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

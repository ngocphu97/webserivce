import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Credential } from '../models';
import { AuthService } from '../services';
import { LoginPageActions, AuthApiActions, AuthActions } from '../actions';
import { LogoutConfirmationDialogComponent } from '../components';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      map(action => action.credential),
      exhaustMap((auth: Credential) =>
        this.authService.login(auth).pipe(
          map(authToken => {
            console.log(authToken);
            return AuthApiActions.loginSuccess({ authToken })
          }),
          catchError(error => of(AuthApiActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginSuccess),
      tap(() => this.router.navigate(['/admin']))
    ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRedirect, AuthActions.logout),
      tap(() => {
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          LogoutConfirmationDialogComponent,
          undefined,
          boolean
        >(LogoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map(
        result =>
          result
            ? AuthActions.logout()
            : AuthActions.logoutConfirmationDismiss()
      )
    )
  );

  lock$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.lock),
        tap(() => {
          this.router.navigate(['/lock']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private actions$: Actions,
    private authService: AuthService,
  ) { }
}

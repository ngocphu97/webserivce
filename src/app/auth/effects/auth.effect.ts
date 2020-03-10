import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Credential } from '../models';
import { AuthService } from '../services';
import { LoginPageActions, AuthApiActions, AuthActions, ResetPasswordActions } from '../actions';
import { LogoutConfirmationDialogComponent } from '../components';

@Injectable()
export class AuthEffects {

  loginCloudFireStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      map(action => action.credential),
      exhaustMap((auth: Credential) => {
        return this.authService.loginStore(auth.email, auth.password).pipe(
          map((response) => {
            if (response && response.empty) {
              return AuthApiActions.loginFailure({ error: response.empty });
            }

            return AuthApiActions.loginSuccess({ user: response });
          }),
          catchError(error => {
            return of(AuthApiActions.loginFailure({ error }));
          })
        )
      })
    ));

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
        const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map(result => result
        ? AuthActions.logout()
        : AuthActions.logoutConfirmationDismiss()
      )
    )
  );

  loginGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.loginGoogle),
      exhaustMap(() => {
        return this.authService.loginWithGG().pipe(
          map((response) => {

            this.ngZone.run(() => {
              this.router.navigate(['/explore']);
            });

            return AuthApiActions.loginSuccess({ user: response });
          }),
          catchError(error => {
            return of(AuthApiActions.loginFailure({ error }));
          }));
      })
    )
  );

  loginFacebook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.loginFacebook),
      exhaustMap(() => {
        return this.authService.loginFB().pipe(
          map((response) => {

            this.ngZone.run(() => {
              this.router.navigate(['/explore']);
            });

            return AuthApiActions.loginSuccess({ user: response });
          }),
          catchError(error => {
            return of(AuthApiActions.loginFailure({ error }));
          }))
      })),
  );

  resetEmailPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.resetPasswordEmail),
      map(action => action.email),
      exhaustMap((email: string) =>
        this.authService.getListAdmin().pipe(
          map((adminList: Array<any>) => {
            if (adminList.some(admin => admin.email === email)) {
              const admin = adminList.find(admin => admin.email === email);
              return ResetPasswordActions.resetPasswordEmailVaild({ admin });
            } else {
              return ResetPasswordActions.resetPasswordEmailInvalid({ error: 'Email incorrect' })
            }
          }),
          catchError(error => of(ResetPasswordActions.resetPasswordFailure({ error })))
        )
      )
    )
  );

  resetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(ResetPasswordActions.resetPassword),
    map(action => action.admin),
    exhaustMap(admin => {
      return this.authService.resetPassword(admin).pipe(
        map(res => {
          return ResetPasswordActions.resetPasswordSuccess(res);
        }),
        catchError(error => of(ResetPasswordActions.resetPasswordFailure({ error })))
      );
    })
  ));

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private actions$: Actions,
    private authService: AuthService,
    private ngZone: NgZone,
  ) { }
}

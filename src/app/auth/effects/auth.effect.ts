import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Credential, UserProfile } from '../models';
import { AuthService } from '../services';
import { LoginPageActions, AuthApiActions, AuthActions, ResetPasswordActions } from '../actions';
import { LogoutConfirmationDialogComponent } from '../components';
import { HttpError } from '@app/core/exception';

@Injectable()
export class AuthEffects {

  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(LoginPageActions.login),
  //     map(action => action.credential),
  //     exhaustMap((auth: Credential) => {
  //       return this.authService.login(auth).pipe(
  //         map((response: any) => {
  //           if(response && response.status === 200 && response.result ) {
  //             const user: UserProfile = {
  //               id: response.result[0].id,
  //               username: response.result[0].email,
  //               password: response.result[0].password,
  //             }
  //             return AuthApiActions.loginSuccess({ user });
  //           } else {
  //             const error: HttpError = {
  //               message: response.message,
  //               status: response.status,
  //               statusText: response.statusText,
  //             };
  //             return AuthApiActions.loginFailure({ error });
  //           }
  //         }),
  //         catchError(error => {
  //           return of(AuthApiActions.l oginFailure({ error }));
  //         })
  //     )}) 
  // ));

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
      map(result => result
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

  resetEmailPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.resetPasswordEmail),
      map(action => action.email),
      exhaustMap((email: string) =>
        this.authService.getListAdmin().pipe(
          map((adminList: Array<any>) => {
            if (adminList.some(admin => admin.email === email )) {
              const admin = adminList.find(admin => admin.email === email);
              return ResetPasswordActions.resetPasswordEmailVaild({admin});
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

  loginFireStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      map(action => action.credential),
      exhaustMap((auth: Credential) => {
        return this.authService.getListData().pipe(
          map((response: Array<any>) => {

            const validUser = response.find(user => user.email === auth.email && user.password === auth.password)
            
            if(validUser) {
              const user: UserProfile = {
                id: validUser.email,
                username: validUser.username,
                password: validUser.password,
              }
              return AuthApiActions.loginSuccess({ user });
            } else {
              const error: HttpError = {
                message: 'Email or password incorrect, please check again',
                status: 400,
                statusText: '',
              };
              return AuthApiActions.loginFailure({ error });
            }
          }),
          catchError(error => {
            return of(AuthApiActions.loginFailure({ error }));
          })
        )
      })
    ));

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private actions$: Actions,
    private authService: AuthService,
  ) { 
  }
}

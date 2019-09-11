import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, distinctUntilChanged, take } from 'rxjs/operators';

import { AUTH_CONFIGURATION, AuthConfiguration, defaultAuthConfig } from '../auth.config';
import { AuthState } from '../reducers';
import { AuthSelectors } from '../selectors';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  private readonly loginURI: string;
  private isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<AuthState>,
    @Inject(AUTH_CONFIGURATION) config: AuthConfiguration,
  ) {
    this.loginURI = config.loginURL ? config.loginURL : defaultAuthConfig.loginURL;

    this.isAuthenticated$ = this.store.pipe(
      select(AuthSelectors.selectIsAuthenticated),
      distinctUntilChanged(),
      take(1),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate([this.loginURI]);
        }
      })
    );
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated$;
  }

  canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
    return this.isAuthenticated$;
  }

}

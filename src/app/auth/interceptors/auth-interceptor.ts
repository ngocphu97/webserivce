import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { AUTH_CONFIGURATION, AuthConfiguration, defaultAuthConfig } from '../auth.config';
import { AuthToken } from '../models';
import { AuthState } from '../reducers';
import { AuthSelectors } from '../selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly whitelistedDomains: Array<string | RegExp>;
  private readonly blacklistedRoutes: Array<string | RegExp>;
  private readonly headerName: string;
  private readonly skipWhenExpired: boolean;

  constructor(
    private store: Store<AuthState>,
    @Inject(AUTH_CONFIGURATION) config: AuthConfiguration
  ) {
    this.whitelistedDomains = config.whitelistedDomains
      ? config.whitelistedDomains
      : defaultAuthConfig.whitelistedDomains;

    this.blacklistedRoutes = config.blacklistedRoutes
      ? config.blacklistedRoutes
      : defaultAuthConfig.blacklistedRoutes;

    this.headerName = config.headerName
      ? config.headerName
      : defaultAuthConfig.headerName;

    this.skipWhenExpired = config.skipWhenExpired
      ? config.skipWhenExpired
      : defaultAuthConfig.skipWhenExpired;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isWhitelistedDomain(req) || this.isBlacklistedRoute(req)) {
      return next.handle(req);
    }

    return this.store.pipe(
      select(AuthSelectors.selectAuthToken),
      take(1),
      mergeMap((authToken: AuthToken) => {
        const tokenIsValid = AuthToken.isValid(authToken);

        if (!tokenIsValid && this.skipWhenExpired) {
          return next.handle(req);
        }

        const request = req.clone({
          setHeaders: { [this.headerName]: `${authToken.tokenType} ${authToken.accessToken}` }
        });

        return next.handle(request);
      })
    );
  }

  private isWhitelistedDomain(request: HttpRequest<any>): boolean {
    const parser = document.createElement('a');
    parser.href = request.url;
    const requestHost = parser.host;

    return (
      requestHost === null ||
      this.whitelistedDomains.findIndex(
        domain =>
          typeof domain === 'string'
            ? domain.includes(requestHost)
            : domain instanceof RegExp
              ? domain.test(requestHost)
              : false
      ) > -1
    );
  }

  private isBlacklistedRoute(request: HttpRequest<any>): boolean {
    const url = request.url;

    return (
      this.blacklistedRoutes.findIndex(
        route =>
          typeof route === 'string'
            ? url.includes(route)
            : route instanceof RegExp
              ? route.test(url)
              : false
      ) > -1
    );
  }

}

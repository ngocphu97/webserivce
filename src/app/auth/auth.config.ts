import { InjectionToken } from '@angular/core';

export const authFeatureKey = 'auth';

export const AUTH_CONFIGURATION = new InjectionToken<AuthConfiguration>('Auth configuration');

export interface AuthConfiguration {
  loginURL: string;
  loginApiURL: string;
  headerName?: string;
  skipWhenExpired?: boolean;
  whitelistedDomains?: Array<string | RegExp>;
  blacklistedRoutes?: Array<string | RegExp>;
}

export const defaultAuthConfig: AuthConfiguration = {
  loginURL: 'login',
  loginApiURL: 'login',
  headerName: 'Authorization',
  skipWhenExpired: true,
  whitelistedDomains: [],
  blacklistedRoutes: []
};

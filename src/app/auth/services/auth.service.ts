import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Credential } from '../models';
import { AUTH_CONFIGURATION, AuthConfiguration } from '../auth.config';
@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(AUTH_CONFIGURATION) private config: AuthConfiguration
  ) { }

  public login(credential: Credential): Observable<any> {
    // return this.http.post(this.config.loginApiURL, credential);
    return of({
      authToken: {
        accessToken: '123',
        expiresIn: 99999999999
      },
      loggedInUser: {
        id: 'fcad7516-9fec',
        username: 'ponyaim',
        avatarUrl: './assets/images/dev.png'
      }
    });
  }

}

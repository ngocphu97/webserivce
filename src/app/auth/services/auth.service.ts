import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AUTH_CONFIGURATION, AuthConfiguration } from '../auth.config';
@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(AUTH_CONFIGURATION) private config: AuthConfiguration
  ) { }

  // public login(): Observable<any> {
  //   return this.http.get(this.config.loginApiURL);
  // }

  login(credential: any): Observable<any> {
    return this.http.post(this.config.loginApiURL, { email: credential.email, password: credential.password });
  }

  getListAdmin(): Observable<any> {
    return this.http.get(this.config.loginApiURL);
  }

  resetPassword(admin: any): Observable<any> {
    return this.http.put(`${this.config.loginApiURL}/${admin.id}`, { ...admin });
  }

}

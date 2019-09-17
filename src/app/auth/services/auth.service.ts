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

  // public login(credential: Credential): Observable<any> {
  //   return this.http.post(this.config.loginApiURL, credential);
  // }

  /**
   * 
   * Login fucntion is mock login with fake data from mock json server
   */
  public login(): Observable<any> {
    return this.http.get(this.config.loginApiURL);
  }

  getListAdmin(): Observable<any> {
    return this.http.get(this.config.loginApiURL);
  }

  resetPassword(admin: any): Observable<any> {
    console.log(admin);
    return this.http.put(`${this.config.loginApiURL}/${admin.id}`, { ...admin });
  }

}

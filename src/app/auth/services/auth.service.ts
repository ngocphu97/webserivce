import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var db: any;

import { AUTH_CONFIGURATION, AuthConfiguration } from '../auth.config';
@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(AUTH_CONFIGURATION) private config: AuthConfiguration
  ) { }

  login(credential: any): Observable<any> {
    return this.http.post(this.config.loginApiURL, {
      email: credential.email,
      password: credential.password
    });
  }

  getListAdmin(): Observable<any> {
    return this.http.get(this.config.loginApiURL);
  }

  resetPassword(admin: any): Observable<any> {
    return this.http.put(`${this.config.loginApiURL}/${admin.id}`, { ...admin });
  }

  getListData(): Observable<any> {
    return new Observable(observer => {
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            users.push(data);
          });

          observer.next(users);
          observer.complete();
        });
    })
  }

  loginStore(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      let users = db.collection('users');
      const query = users
        .where('email', '==', email)
        .where('password', '==', password)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            observer.next({
              empty: {
                message: 'Email or password incorrect, please check again',
                status: 400,
                statusText: '',
              }
            });
            observer.complete();
            return;

          }

          snapshot.forEach((doc) => {
            observer.next({
              id: doc.id,
              ...doc.data()
            });
            observer.complete();
          });
        })
        .catch(() => {
          observer.next({
            message: 'Error getting documents',
            status: 400,
            statusText: '',
          })
          observer.complete();
        });

    })
  }
}

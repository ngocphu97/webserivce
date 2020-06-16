import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, concat, combineLatest } from 'rxjs';

declare var db: any;
declare var FB: any;
declare const firebase: any;

import { AUTH_CONFIGURATION, AuthConfiguration } from '../auth.config';
import { connected } from 'process';
import { mergeMap } from 'rxjs/operators';
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

  loginTest(): Observable<any> {

    return new Observable((observer) => {
      FB.login((response) => {
        if (response && response.status === 'connected') {
          const userData$: Observable<any> = combineLatest(
            this.getUserPicture(),
            this.getProfile(),
            (profile, picture) => {
              return {
                ...profile,
                ...picture
              }
            }
          );

          userData$.pipe().subscribe(data => {
            this.checkUser({
              id: data.id,
              facebookNumber: data.id,
              email: data.email ? data.email : 'No email',
              profile: {
                name: data.name,
                picture: !data.picture ? '/assets/gudjob-logo-1.png' : data.picture
              },
            }).then(user => {

              let loginUser;

              if (user) {
                loginUser = {
                  ...user
                };

                observer.next(loginUser);
                observer.complete();
              }
            });
          })
        }

      }, { scope: 'public_profile, email' });
    })
  }

  getProfile(): Observable<any> {
    return new Observable((observer) => {
      FB.api('/me', (response) => {
        const userData = {
          id: response.id,
          name: response.name
        }

        observer.next(userData);
      });
    })
  }

  getUserPicture(): Observable<any> {
    return new Observable((observer) => {
      FB.api('/me/picture',
        {
          'redirect': false,
          'height': 500,
          'width': 500,
          'type': 'large'
        },
        function (response) {
          if (response && !response.error) {
            const userData = {
              picture: response.data.url
            }

            observer.next(userData);
          }
        }
      );
    })
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
        .where('id', '==', email)
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

            return observer.complete();
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

  loginWithGG(): Observable<any> {

    let loginUser;

    return new Observable((observer) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
      firebase.auth().signInWithPopup(provider)
        .then((result) => {

          this.checkUser({
            id: result.additionalUserInfo.profile.id,
            profile: result.additionalUserInfo.profile,
            isNewUser: result.additionalUserInfo.isNewUser,
            email: result.user.email
          }).then(user => {
            if (user) {
              loginUser = {
                ...user
              };

              observer.next(loginUser);
              observer.complete();
            }
          });
        })
    })
  }

  loginFB(): Observable<any> {
    return new Observable((observer) => {

      let loginUser;

      const provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          this.checkUser({
            id: result.additionalUserInfo.profile.id,
            profile: result.additionalUserInfo.profile,
            isNewUser: result.additionalUserInfo.isNewUser
          }).then(user => {

            if (user) {
              loginUser = {
                ...user
              };

              observer.next(loginUser);
              observer.complete();
            }
          });
        })

    });
  }

  async checkUser(loginUser: any) {
    let users = db.collection('users');
    return await users
      .where('facebookNumber', '==', loginUser.facebookNumber)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          db.collection('users')
            .add({
              ...loginUser,
              facebookNumber: loginUser.id,
              isApproved: false,
              role: 'client'
            })
            .then(() => {
              return {
                ...loginUser,
                facebookNumber: loginUser.id,
                isApproved: false,
                role: 'client'
              };
            });
        };

        let user = {};
        snapshot.forEach((doc) => {
          user = {
            ...doc.data(),
            id: doc.id,
          }
        });

        return user;
      });
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
      FB.logout();
    });
  }
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var db: any;
declare const firebase: any;

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
      .where('id', '==', loginUser.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          db.collection('users')
            .add({ ...loginUser, isApproved: false })
            .then((ref) => {
              loginUser.id = ref.id
              return { ...loginUser, isApproved: false };
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

  addNewUser(newUser): Observable<any> {
    return new Observable((observer) => {
      db.collection('users')
        .add(newUser)
        .then((ref) => {
          observer.next({
            ...newUser,
            id: ref.id
          });
          observer.complete();
        });
    })
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
      firebase.auth().signOut().then(() => {
        observer.next({ error: null });
      }).catch(function (error) {
        observer.next({ error: error });
        observer.complete();
      });
    });
  }
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '../../models/user.model';

declare let db: any;

@Injectable()
export class ManageService {

  constructor() { }

  getUsers(): Observable<Array<User>> {
    return new Observable(observer => {
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            users.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          observer.next(users);
          observer.complete();
        });
    })
  }

  addNewUser(newUser: User): Observable<User> {
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

  updateUser(updateUser: User): Observable<User> {
    return new Observable((observer) => {
      db.collection('users')
        .doc(updateUser.id)
        .update(updateUser)
        .then(() => {
          observer.next(updateUser);
          observer.complete();
        });
    });
  }

  removeUser(removeUser: User): Observable<User> {
    return new Observable((observer) => {
      db.collection('users')
        .doc(removeUser.id)
        .delete()
        .then(() => {
          observer.next(removeUser);
          observer.complete();
        });
    });
  }

}

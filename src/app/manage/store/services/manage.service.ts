import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
// import {
//   EntityCollectionServiceBase,
//   EntityCollectionServiceElementsFactory
// } from '@ngrx/data';

import { User } from '../../models/user.model';

declare var db: any;

@Injectable()
export class ManageService {

  constructor() {
  }
  // super('Explore', serviceElementsFactory);

  getUsers(): Observable<Array<User>> {
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
}

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ManageState, getUserList, selectUsers } from '../../store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<Array<User>>;
  dataSource: any;
  displayedColumns = ['userName', 'email', 'actions'];

  isEdit = false;

  constructor(private store: Store<ManageState>) {
    this.store.dispatch(getUserList());

    this.users$ = this.store.pipe(select(selectUsers));
    this.users$.subscribe(users => {
      this.dataSource = users;
    });
  }

  ngOnInit() {
  }

  logout() {

  }

  editUser() {
    this.isEdit = true;
  }

  saveUser() {
    this.isEdit = false;
  }

  lockUser() {

  }

}

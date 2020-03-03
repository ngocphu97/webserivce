import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ManageState, getUserList, selectUsers, updateUser, selectPending } from '../../store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { logoutConfirmation } from 'src/app/auth/actions/auth.action';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<Array<User>>;
  pending$: Observable<boolean>;
  dataSource: any;
  displayedColumns = ['userName', 'email', 'actions'];

  isEdit = false;
  isSelectedId: string;
  updateUserName: string;
  updateEmail: string;

  constructor(private store: Store<ManageState>) {
    this.store.dispatch(getUserList());
    this.pending$ = this.store.pipe(select(selectPending));

    this.users$ = this.store.pipe(select(selectUsers));
    this.users$.subscribe(users => {
      this.dataSource = users;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(logoutConfirmation());
  }

  editUser(element) {
    this.isEdit = true;
    this.isSelectedId = element.id;
    this.updateUserName = element.username;
    this.updateEmail = element.email;
  }

  saveUser(id: any) {
    this.isEdit = false;
    this.isSelectedId = null;

    const user: User = {
      id,
      username: this.updateUserName,
      email: this.updateEmail,
    };

    this.store.dispatch(updateUser({ user }));
  }

  cancel() {
    this.isEdit = false;
    this.isSelectedId = null;
  }

}

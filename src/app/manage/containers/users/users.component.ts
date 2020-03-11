import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ManageState, getUserList, selectUsers, updateUser, selectPending, addUser, removeUser } from '../../store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { logoutConfirmation } from 'src/app/auth/actions/auth.action';
import { MatDialog } from '@angular/material';
import { selectLoggedInUser } from 'src/app/auth/selectors/auth.selector';
import { EditProfileDialogComponent } from '@app/shared/dialog/edit-profile-dialog/edit-profile-dialog.component';
import { ConfirmDialogComponent } from '@app/shared/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<Array<User>>;
  pending$: Observable<boolean>;
  loggedInUser$: Observable<any>;
  loggedUser: any;

  dataSource: any;
  displayedColumns = ['picture', 'userName', 'email', 'type', 'actions'];

  isEdit = false;
  isSelectedId: string;
  updateUserName: string;
  updateEmail: string;

  constructor(private store: Store<ManageState>, private dialog: MatDialog) {
    this.store.dispatch(getUserList());
    this.pending$ = this.store.pipe(select(selectPending));

    this.loggedInUser$ = this.store.pipe(select(selectLoggedInUser));
    this.loggedInUser$.subscribe(user => this.loggedUser = user);

    this.users$ = this.store.pipe(select(selectUsers));
    this.users$.subscribe(users => {
      console.log('Log Message: UsersComponent -> constructor -> users', users);
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

  addNewUser() {
    this.dialog.open(EditProfileDialogComponent, {
      data: {
        email: '',
        username: '',
        password: ''
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        const newUser = {
          username: res.username,
          email: res.email,
          password: res.password,
          role: 'user'
        };

        this.store.dispatch(addUser({ user: newUser }));
      }
    });
  }

  removeUser(user) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm delete user',
        message: 'Are you sure you want to delete this user'
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.store.dispatch(removeUser({ user }));
      }
    });
  }

  approveUser(user) {
    const approveUser = {
      ...user,
      isApproved: true
    };

    console.log('Log Message: UsersComponent -> approveUser -> approveUser', approveUser);

    this.store.dispatch(updateUser({ user: approveUser }));
  }

  cancel() {
    this.isEdit = false;
    this.isSelectedId = null;
  }

}

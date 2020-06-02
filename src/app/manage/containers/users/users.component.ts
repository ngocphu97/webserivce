import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';

import { User } from '../../models/user.model';
import { logoutConfirmation } from '@app/auth/actions/auth.action';
import { selectLoggedInUser } from '@app/auth/selectors/auth.selector';
import { ConfirmDialogComponent } from '@app/shared/dialog/confirm-dialog/confirm-dialog.component';
import {
  ManageState, getUserList, selectUsers,
  updateUser, selectPending, removeUser
} from '../../store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

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

  constructor(
    private store: Store<ManageState>,
    private dialog: MatDialog
  ) {
    this.store.dispatch(getUserList());

    this.users$ = this.store.pipe(select(selectUsers));
    this.pending$ = this.store.pipe(select(selectPending));
    this.loggedInUser$ = this.store.pipe(select(selectLoggedInUser));

    this.users$.pipe().subscribe(users => {
      this.dataSource = users
    });
    this.loggedInUser$.pipe().subscribe(user => this.loggedUser = user);
  }

  logout() {
    this.store.dispatch(logoutConfirmation());
  }

  removeUser(user) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Confirm delete user',
          message: 'Are you sure you want to delete this user ?'
        }
      })
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.store.dispatch(removeUser({ user }));
        }
      });
  }

  approveUser(user: any) {
    this.store.dispatch(updateUser({
      user: {
        ...user,
        isApproved: true
      }
    }));
  }

  approveRole(user: any, role: string) {
    this.store.dispatch(updateUser({
      user: {
        ...user,
        role
      }
    }));
  }
}

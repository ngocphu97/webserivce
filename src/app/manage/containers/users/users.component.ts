import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ManageState, getUserList, selectUsers, updateUser, selectPending } from '../../store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { logoutConfirmation } from 'src/app/auth/actions/auth.action';
import { MatDialog } from '@angular/material';
import { selectLoggedInUser } from 'src/app/auth/selectors/auth.selector';
import { EditProfileDialogComponent } from '@app/shared/dialog/edit-profile-dialog/edit-profile-dialog.component';

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
  displayedColumns = ['userName', 'email', 'actions'];

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
      this.dataSource = users;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(logoutConfirmation());
  }

  editProfile() {
    this.dialog.open(EditProfileDialogComponent, {
      data: {
        email: this.loggedUser.email,
        username: this.loggedUser.username,
        password: this.loggedUser.password
      }
    }).afterClosed().subscribe((res) => {
      if(res) {
        const user: User = {
          id: this.loggedUser.id,
          username: res.username,
          email: res.email,
          password: res.password
        };

        this.store.dispatch(updateUser({ user }));
      }
    });
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

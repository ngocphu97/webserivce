import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import * as fromStore from '../../store';
import { ExploreModel, Search, AdSuggestion } from '../../models';

import { updateUser } from 'src/app/manage/store';
import { User } from 'src/app/manage/models/user.model';
import { AuthActions } from '@app/auth';
import { selectLoggedInUser } from 'src/app/auth/selectors/auth.selector';
import { EditProfileDialogComponent } from '@app/shared/dialog/edit-profile-dialog/edit-profile-dialog.component';
import { getName } from '../../store';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss'],
})
export class ExplorePageComponent {
  pending$: Observable<boolean>;
  totalInterest$: Observable<number>;
  exploredList$: Observable<Array<ExploreModel>>;
  adSuggestionList$: Observable<Array<AdSuggestion>>;

  loggedUser: any;
  loggedInUser$: Observable<any>;
  selectedInterest: ExploreModel = null;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromStore.ExploreState>
  ) {
    this.pending$ = this.store.pipe(select(fromStore.selectExplorePending));
    this.exploredList$ = this.store.pipe(select(fromStore.selectAllExplore));
    this.totalInterest$ = this.store.pipe(select(fromStore.selectTotalExplore));

    this.adSuggestionList$ = this.store.pipe(select(fromStore.selectAllAdSuggestionList));

    this.loggedInUser$ = this.store.pipe(select(selectLoggedInUser));
    this.loggedInUser$.subscribe(user => {
      this.loggedUser = user;
     });
  }

  onSelectInterest(interest: ExploreModel): void {
    this.selectedInterest = interest;
  }

  onSearch(search: Search): void {
    this.store.dispatch(fromStore.getExploreList({ search: search }));
  }

  getAdSuggestionList(search: Search): void {
    this.store.dispatch(fromStore.getAdSuggestionList({ search: search }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }

  editProfile(): void {
    this.dialog
      .open(EditProfileDialogComponent, {
        data: {
          email: this.loggedUser.email,
          username: this.loggedUser.username,
          password: this.loggedUser.password
        }
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
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
}

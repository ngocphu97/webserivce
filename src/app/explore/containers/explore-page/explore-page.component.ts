import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import { ExploreModel, Search, AdSuggestion } from '../../models';
import { AuthActions } from '@app/auth';
import { selectLoggedInUser } from 'src/app/auth/selectors/auth.selector';
import { EditProfileDialogComponent } from '@app/shared/dialog/edit-profile-dialog/edit-profile-dialog.component';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/manage/models/user.model';
import { updateUser } from 'src/app/manage/store';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss']
})
export class ExplorePageComponent {
  exploredList$: Observable<Array<ExploreModel>>;
  adSuggestionList$: Observable<Array<AdSuggestion>>;
  pending$: Observable<boolean>;
  totalInterest$: Observable<number>;

  selectedInterest: ExploreModel = null;

  loggedInUser$: Observable<any>;
  loggedUser: any;

  constructor(
    private store: Store<fromStore.ExploreState>,
    private dialog: MatDialog
  ) {
    this.exploredList$ = this.store.pipe(select(fromStore.selectAllExplore));
    this.pending$ = this.store.pipe(select(fromStore.selectExplorePending));

    this.totalInterest$ = this.store.pipe(select(fromStore.selectTotalExplore));

    this.exploredList$ = this.store.pipe(select(fromStore.selectAllExplore));
    this.adSuggestionList$ = this.store.pipe(select(fromStore.selectAllAdSuggestionList));

    this.loggedInUser$ = this.store.pipe(select(selectLoggedInUser));
    this.loggedInUser$.subscribe(user => {
      this.loggedUser = user
    });

  }

  onSelectInterest(interest: ExploreModel) {
    this.selectedInterest = interest;
  }

  onSearch(search: Search): void {
    this.store.dispatch(fromStore.getExploreList({ search: search }));
  }

  getAdSuggestionList(search: Search): void {
    this.store.dispatch(fromStore.getAdSuggestionList({ search: search }));
  }

  logout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }

  editProfile() {
    this.dialog.open(EditProfileDialogComponent, {
      data: {
        email: this.loggedUser.email,
        username: this.loggedUser.username,
        password: this.loggedUser.password
      }
    }).afterClosed().subscribe((res) => {
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

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Credential } from '../../models';
import { AuthState } from '../../reducers';
import { LoginPageActions } from '../../actions';
import { AuthSelectors, LoginPageSelectors } from '../../selectors';

@Component({
  selector: 'app-lock-screen-page',
  templateUrl: './lock-screen-page.component.html',
  styleUrls: ['./lock-screen-page.component.scss', '../auth-page.scss']
})
export class LockScreenPageComponent implements OnInit {

  pending$ = this.store.pipe(select(LoginPageSelectors.selectLoginPagePending));
  loggedInUser$ = this.store.pipe(select(AuthSelectors.selectLoggedInUser));

  constructor(
    private store: Store<AuthState>
  ) { }

  ngOnInit() {
  }

  onLogin(credential: Credential): void {
    this.store.dispatch(LoginPageActions.login({ credential }));
  }

}

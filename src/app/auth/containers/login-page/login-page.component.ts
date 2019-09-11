import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AuthState } from '../../reducers';
import { Credential } from '../../models';
import { LoginPageActions } from '../../actions';
import { LoginPageSelectors } from '../../selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../auth-page.scss']
})
export class LoginPageComponent implements OnDestroy {

  pending$ = this.store.pipe(select(LoginPageSelectors.selectLoginPagePending));
  error$ = this.store.pipe(select(LoginPageSelectors.selectLoginPageError));

  constructor(
    private store: Store<AuthState>
  ) { }

  onLogin(credential: Credential) {
    this.store.dispatch(LoginPageActions.login({ credential }));
  }

  ngOnDestroy() {
    this.store.dispatch(LoginPageActions.leavePage());
  }
}

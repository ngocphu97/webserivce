import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AuthState } from '../../reducers';
import { Credential } from '../../models';
import { LoginPageActions } from '../../actions';
import { Observable } from 'rxjs';
import { selectLoginPagePending, selectLoginPageError } from '../../selectors/login-page.selector';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../auth-page.scss']
})
export class LoginPageComponent implements OnDestroy {

  pending$: Observable<boolean>;
  error$: Observable<any>;

  pending: boolean;
  error: string;

  constructor(private store: Store<AuthState>) {
    this.pending$ = this.store.pipe(select(selectLoginPagePending));
    this.error$ = this.store.pipe(select(selectLoginPageError));
  }

  onLogin(credential: Credential) {
    this.store.dispatch(LoginPageActions.login({ credential }));
  }

  ngOnDestroy() {
    this.store.dispatch(LoginPageActions.leavePage());
  }

  loginGG() {
    this.store.dispatch(LoginPageActions.loginGoogle());
  }

  loginFB() {
    this.store.dispatch(LoginPageActions.loginFacebook());
  }
}

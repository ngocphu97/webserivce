import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AuthState } from '../../reducers';
import { ResetPasswordActions } from '../../actions';
import { ResetPasswordSelectors } from '../../selectors';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss', '../auth-page.scss']
})
export class ResetPasswordPageComponent {

  pending$ = this.store.pipe(select(ResetPasswordSelectors.selectResetPasswordPagePending));

  constructor(
    private store: Store<AuthState>
  ) { }

  onResetPassword(password: string): void {
    this.store.dispatch(ResetPasswordActions.resetPassword({ password }));
  }

}

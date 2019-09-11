import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthState } from '../../reducers';
import { ResetPasswordActions } from '../../actions';
import { ResetPasswordSelectors } from '../../selectors';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss', '../auth-page.scss']
})
export class ForgotPasswordPageComponent {
  pending$: Observable<boolean> = this.store.pipe(select(ResetPasswordSelectors.selectResetPasswordPagePending));

  constructor(
    private store: Store<AuthState>
  ) { }

  onResetPassword(email: string): void {
    this.store.dispatch(ResetPasswordActions.sendResetPasswordLink({ email }));
  }

}

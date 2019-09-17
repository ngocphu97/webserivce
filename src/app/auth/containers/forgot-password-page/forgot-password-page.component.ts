import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { AuthState } from '../../reducers';
import { ResetPasswordActions } from '../../actions';
import { ResetPasswordSelectors } from '../../selectors';
import { DetroyableComponent } from '@app/core/destroyable';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss', '../auth-page.scss']
})
export class ForgotPasswordPageComponent extends DetroyableComponent {

  protected componentDestroyed$: Subject<any>;

  pending$: Observable<boolean>;
  isVaidResetPassword$: Observable<boolean>;
  admin: any;

  constructor(private store: Store<AuthState>) {
    super();
    this.pending$ = this.store.pipe(select(ResetPasswordSelectors.selectResetPasswordPagePending));
    this.isVaidResetPassword$ = this.store.pipe(select(ResetPasswordSelectors.selectIsVaidResetPassword));
    this.store.pipe(select(ResetPasswordSelectors.selectAdmin)).pipe().subscribe(admin => {
      console.log(admin);
      return this.admin = admin;
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.unsubscribe();
  }

  checkResetEmail(email: string) {
    this.store.dispatch(ResetPasswordActions.resetPasswordEmail({ email }));
  }

  onResetPassword(resetPassword: any): void {
    const updateAdmin = {
      ...this.admin,
      password: resetPassword.password
    };

    this.store.dispatch(ResetPasswordActions.resetPassword({ admin: updateAdmin }));
  }

}

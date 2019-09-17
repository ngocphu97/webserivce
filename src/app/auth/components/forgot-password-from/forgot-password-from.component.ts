import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-from',
  templateUrl: './forgot-password-from.component.html',
  styleUrls: ['./forgot-password-from.component.scss', '../auth-from.scss']
})
export class ForgotPasswordFromComponent {

  @Input() pending: boolean;
  @Input() isVaidResetPassword: boolean;

  @Output() resetPasswordEmail: EventEmitter<string> = new EventEmitter();
  @Output() resetPassword: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  emailControl: FormControl;
  passwordControl: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl(null);

    this.form = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  onSubmit(): void {
    if (this.emailControl.value && !this.passwordControl.value) {
      this.resetPasswordEmail.emit(this.emailControl.value);
    }

    if (this.passwordControl.value) {
      const resetPassword = {
        email: this.emailControl.value,
        password: this.passwordControl.value
      }
      this.resetPassword.emit(resetPassword);
    }
  }

}

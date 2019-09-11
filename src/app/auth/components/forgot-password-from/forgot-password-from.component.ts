import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-from',
  templateUrl: './forgot-password-from.component.html',
  styleUrls: ['./forgot-password-from.component.scss', '../auth-from.scss']
})
export class ForgotPasswordFromComponent {
  @Input() pending: boolean;

  @Output() resetPassword: EventEmitter<string> = new EventEmitter();

  form: FormGroup;
  emailControl: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.emailControl = new FormControl('', [Validators.required, Validators.email]);

    this.form = this.formBuilder.group({
      email: this.emailControl
    });
  }

  onSubmit(): void {
    this.resetPassword.emit(this.emailControl.value);
  }

}

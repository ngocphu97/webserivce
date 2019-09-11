import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormValidators } from '@app/shared/validators';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss', '../auth-from.scss']
})
export class ResetPasswordFormComponent implements OnInit {

  @Input() pending: boolean;

  @Output() resetPassword: EventEmitter<string>;

  form: FormGroup;
  formErrors: any;

  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private formBuilder: FormBuilder) {

    this.resetPassword = new EventEmitter();

    this.formErrors = {
      password: {},
      confirmPassword: {}
    };
    this.form = this.formBuilder.group(
      {
        password: [null, Validators.required],
        confirmPassword: [null, [Validators.required]]
      },
      {
        validators: [FormValidators.mustMatch('password', 'confirmPassword')]
      }
    );
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.resetPassword.emit(this.form.value.password);
  }

  private onLoginFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      this.formErrors[field] = {};
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

}

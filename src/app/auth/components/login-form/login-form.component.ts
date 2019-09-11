import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { takeUntilDestroy } from '@app/core/destroyable';
import { Credential } from '@app/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss', '../auth-from.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() pending: boolean;

  @Output() login: EventEmitter<Credential>;

  form: FormGroup;
  formErrors: any;

  constructor(private formBuilder: FormBuilder) {

    this.login = new EventEmitter();

    this.formErrors = {
      username: {},
      password: {}
    };
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntilDestroy(this)
    ).subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.login.emit(this.form.value);
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

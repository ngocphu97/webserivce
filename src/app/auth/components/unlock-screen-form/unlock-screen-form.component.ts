import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { takeUntilDestroy } from '@app/core/destroyable';
import { Credential, UserProfile } from '../../models';
@Component({
  selector: 'app-unlock-screen-form',
  templateUrl: './unlock-screen-form.component.html',
  styleUrls: ['./unlock-screen-form.component.scss', '../auth-from.scss']
})
export class UnlockScreenFormComponent implements OnChanges, OnInit {
  @Input() pending: boolean;
  @Input() user: UserProfile;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && this.user) {
      if (this.form) {
        this.form.patchValue({ username: this.user.username });
      }
    }
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

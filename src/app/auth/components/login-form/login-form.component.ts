import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Credential } from '@app/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss', '../auth-from.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() pending: boolean;
  @Output() loginUser: EventEmitter<Credential>;

  form: FormGroup;

  get email() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  constructor(private formBuilder: FormBuilder) {
    this.loginUser = new EventEmitter();

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.loginUser.emit(this.form.value);
  }

  loginGG() { }

  loginFB() { }


}

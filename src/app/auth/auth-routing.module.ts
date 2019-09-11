import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LoginPageComponent,
  ForgotPasswordPageComponent,
  LockScreenPageComponent,
  ResetPasswordPageComponent
} from './containers';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'lock',
    component: LockScreenPageComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

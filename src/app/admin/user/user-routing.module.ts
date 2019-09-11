import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsApproveGuard } from '@app/auth';

import { UsersPageComponent, PenddingAccountComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    // canActivate: [IsApproveGuard],
  },
  {
    path: 'pending-account',
    component: PenddingAccountComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }

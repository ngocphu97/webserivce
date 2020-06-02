import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'explore'
      },
      {
        path: 'manage',
        loadChildren: () => import('../manage/manage.module').then(m => m.ManageModule),
      },
      {
        path: '**',
        redirectTo: 'explore'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

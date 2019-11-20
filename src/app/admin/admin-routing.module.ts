import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { animation: 'open' }
      },
      {
        path: 'books',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
        data: { animation: 'open' }
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        data: { animation: 'open' }
      },
      {
        path: '**',
        redirectTo: 'overview'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

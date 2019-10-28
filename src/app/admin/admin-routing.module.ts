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
        redirectTo: 'books'
      },
      {
        path: 'overview',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { animation: 'open' }
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
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
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

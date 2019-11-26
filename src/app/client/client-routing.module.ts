import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDashboardComponent } from './containers/client-dashboard/client-dashboard.component';
import { BookLayoutComponent } from './containers/book-layout/book-layout.component';


const routes: Routes = [
  {
    path: '',
    component: ClientDashboardComponent
  },
  {
    path: 'books',
    component: BookLayoutComponent, 
    loadChildren: () => import('./book/book.module').then(m => m.BookModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

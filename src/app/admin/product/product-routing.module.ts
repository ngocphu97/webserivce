import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.ProductsPageComponent
  },
  {
    path: 'add-book',
    component: fromContainers.AddProductPageComponent
  },
  {
    path: 'edit-book/:bookId',
    component: fromContainers.EditProductPageComponent
  },
  {
    path: ':bookId',
    component: fromContainers.DetailProductPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

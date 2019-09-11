import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPageComponent, AddProductPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent
  },
  {
    path: 'add-product',
    component: AddProductPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

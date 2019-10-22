import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from './containers';
import { BooksResolve } from './service/book.resolve';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.ProductsPageComponent,
    resolve: {
      booksResolve: BooksResolve
    }  
  },
  {
    path: 'add-book',
    component: fromContainers.AddProductPageComponent
  },
  {
    path: ':bookId/edit-book',
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksPageComponent } from './containers/books-page/books-page.component';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { DeatailPageComponent } from './containers/deatail-page/deatail-page.component';
import { BooksResolve } from 'src/app/admin/product/service/book.resolve';

const routes: Routes = [
  {
    path: '',
    component: BooksPageComponent,
    resolve: {
      books: BooksResolve
    }
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'detail/:id',
    component: DeatailPageComponent
  },
  {
    path: 'location/:id',
    component: DeatailPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }

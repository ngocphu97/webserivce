import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.ProductsPageComponent
  },
  {
    path: 'proposal-import',
    component: fromContainers.ImportProposalPageComponent
  },
  {
    path: 'proposal-import/create',
    component: fromContainers.AddImportProposalPageComponent
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

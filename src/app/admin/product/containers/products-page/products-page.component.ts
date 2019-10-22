import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../store/reducers/book.reducer';
import { getBookList } from '../../store/actions';
import * as fromBooksSelector from '../../store/selector';
import * as fromCategoriesSelector from '../../../dashboard/store/category/category.selector';
import { getCategoriesList } from 'src/app/admin/dashboard/store/category/category.actions';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {

  books$: Observable<any>;
  categories$: Observable<any>;
  pending$: Observable<boolean>;

  constructor(
    private store: Store<State>
  ) {
    this.store.dispatch(getBookList());
    this.books$ = this.store.pipe(select(fromBooksSelector.selectBookList));

    this.store.dispatch(getCategoriesList());
    this.categories$ = this.store.pipe(select(fromCategoriesSelector.selectCategoriesList));
  }
}

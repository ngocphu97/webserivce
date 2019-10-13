import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../store/reducers/book.reducer';
import { getBookList } from '../../store/actions';
import * as fromBooksSelector from '../../store/selector';
import * as fromCategoriesSelector from '../../../dashboard/store/categories.selector';
import { BookService } from '../../service';
import { getCategoriesList } from 'src/app/admin/dashboard/store/categories.actions';

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
    private store: Store<State>,
    private service: BookService
  ) {
    this.store.dispatch(getBookList());
    this.books$ = this.store.pipe(select(fromBooksSelector.selectBookList));

    this.store.dispatch(getCategoriesList());
    this.categories$ = this.store.pipe(select(fromCategoriesSelector.selectCategoriesList));
  }
}

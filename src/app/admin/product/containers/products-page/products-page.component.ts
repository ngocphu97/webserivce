import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Book } from '../../models/book.model';

import { BookState } from '../../store/reducers/book.reducer';
import { getBookList } from '../../store/actions';
import * as fromSelector from '../../store/selector';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {

  books$: Observable<Array<Book>>;
  pending$: Observable<boolean>;

  constructor(private store: Store<BookState>) {
    this.store.dispatch(getBookList());

    this.books$ = this.store.pipe(select(fromSelector.selectBookList));
    this.pending$ = this.store.pipe(select(fromSelector.selectBookPending));
  }

}

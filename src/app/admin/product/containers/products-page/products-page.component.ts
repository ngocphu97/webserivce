import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Book } from '../../models/book.model';

import { State } from '../../store/reducers/book.reducer';
import { getBookList } from '../../store/actions';
import * as fromSelector from '../../store/selector';
import { BookService } from '../../service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {

  books$: Observable<any>;
  pending$: Observable<boolean>;

  constructor(private store: Store<State>, private service: BookService) {
    this.store.dispatch(getBookList());
    this.books$ = this.store.pipe(select(fromSelector.selectBookList));
  }
}

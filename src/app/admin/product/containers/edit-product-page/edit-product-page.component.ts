import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { State } from '../../store/reducers';
import { selectCurrentBook } from '../../store/selector';
import { getBookById, updateBookById, getBookList } from '../../store/actions';

import { Book } from '../../models/book.model';

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html',
  styleUrls: ['./edit-product-page.component.css']
})
export class EditProductPageComponent implements OnInit {

  selectedBook$: Observable<Book>;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const bookId = parseInt(params.get('bookId').toString(), 0);
      this.store.dispatch(getBookById({ bookId }));
    });
    this.store.dispatch(getBookList());
    this.selectedBook$ = this.store.pipe(select(selectCurrentBook));
  }

  ngOnInit() {
  }

  onEditBook(book: any) {
    this.store.dispatch(updateBookById({ book: book }));
  }

}

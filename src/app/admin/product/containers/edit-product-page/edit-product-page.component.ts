import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { BookState } from '../../store/reducers';
import { getBookById, updateBookById } from '../../store/actions';
import { selectSelectedBook } from '../../store/selector';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html',
  styleUrls: ['./edit-product-page.component.css']
})
export class EditProductPageComponent implements OnInit {

  selectedBook$: Observable<Book>;

  constructor(
    private store: Store<BookState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('bookId').toString();
      this.store.dispatch(getBookById({ bookId }));
      this.selectedBook$ = this.store.pipe(select(selectSelectedBook));
    }).unsubscribe();
  }

  onEditBook(book: Book) {
    this.store.dispatch(updateBookById({ book: book }));
  }

}

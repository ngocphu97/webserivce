import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Book } from '../../models/book.model';
import { BookState } from '../../store/reducers';
import { getBookById, deleteBook } from '../../store/actions';
import { selectSelectedBook } from '../../store/selector';

@Component({
  selector: 'app-detail-product-page',
  templateUrl: './detail-product-page.component.html',
  styleUrls: ['./detail-product-page.component.scss']
})
export class DetailProductPageComponent implements OnInit {

  selectedBook$: Observable<Book>;

  constructor(
    private store: Store<BookState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('bookId').toString();
      this.store.dispatch(getBookById({ bookId }));
      this.selectedBook$ = this.store.pipe(select(selectSelectedBook));
    }).unsubscribe();
  }

  onDeleteBook(book: Book) {
    this.store.dispatch(deleteBook({ book }));
    this.router.navigate(['/admin/books']);
  }
}

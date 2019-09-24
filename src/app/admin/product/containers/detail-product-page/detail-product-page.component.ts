import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Book } from '../../models/book.model';
import { State } from '../../store/reducers';
import { deleteBook, getBookById, getBookList } from '../../store/actions';
import { selectCurrentBook } from '../../store/selector';

@Component({
  selector: 'app-detail-product-page',
  templateUrl: './detail-product-page.component.html',
  styleUrls: ['./detail-product-page.component.scss']
})
export class DetailProductPageComponent implements OnInit {

  selectedBook$: Observable<any>;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('bookId').toString();
      this.store.dispatch(getBookById({ bookId }));
    });
    this.store.dispatch(getBookList());
    this.selectedBook$ = this.store.pipe(select(selectCurrentBook));
  }

  ngOnInit() {
  }

  onDeleteBook(book: Book) {
    this.store.dispatch(deleteBook({ book }));
    this.router.navigate(['/admin/books']);
  }
}

import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectBookList, selectLoading } from 'src/app/admin/product/store/selector';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/admin/product/models';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {

  p: number = 1;

  books$: Observable<any>;
  loading$: Observable<boolean>;
  keyword: string;
  filterdBook: Array<Book>;
  books: Array<Book>;

  constructor(private store: Store<any>, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(y => this.keyword = y.keyword);

    this.books$ = this.store.pipe(select(selectBookList));
    this.loading$ = this.store.pipe(select(selectLoading));

    this.books$.subscribe(bookList => {
      if (bookList) {
        this.books = bookList;
        this.filterdBook = bookList.filter(book => book.name.toLowerCase().includes(this.keyword));
        return this.filterdBook;
      }
    });

  }

  onSearch(keyword) {
    this.filterdBook = this.books.filter(book => book.name.toLowerCase().includes(keyword))
  }

}

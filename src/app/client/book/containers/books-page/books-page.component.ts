import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { selectBookList } from 'src/app/admin/product/store/selector';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksPageComponent {

  p: number = 1;

  books$: Observable<any>;
  bookLocation$: Observable<any>;

  constructor(
    private store: Store<any>,
    private router: Router
  ) {
    this.books$ = this.store.pipe(select(selectBookList));
  }

  onSearch(keyword: string) {
    keyword = keyword.split(' ').join('+');
    this.router.navigate(['/client/books/search'], { queryParams: { keyword } });
  }

}

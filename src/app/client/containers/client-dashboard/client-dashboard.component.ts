import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Book } from 'src/app/admin/product/models';
import { selectAllBooks } from 'src/app/admin/product/store/reducers';
import { selectTopSearch } from 'src/app/admin/product/store/selector';
import { getTopSearchBooksByTime, getBookList } from 'src/app/admin/product/store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {

  books$: Observable<Array<Book>>;
  topSearchBooks$: Observable<any>;

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {

    this.store.dispatch(getTopSearchBooksByTime({ time: 90 }));
    this.topSearchBooks$ = this.store.pipe(select(selectTopSearch));

    this.store.dispatch(getBookList());
    this.books$ = this.store.pipe(select(selectAllBooks));
  }

  onSeachWithKeyword(keyword: string) {
    keyword = keyword.split(' ').join('+');
    this.router.navigate(['/client/books/search'], { queryParams: { keyword } });
  }
}


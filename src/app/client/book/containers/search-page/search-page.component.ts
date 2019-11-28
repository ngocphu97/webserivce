import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Book } from 'src/app/admin/product/models';
import { getBooksByKeyword } from 'src/app/admin/product/store/actions';
import { selectLoading, selectSearchBookByKeywordList } from 'src/app/admin/product/store/selector';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {

  p: number = 1;

  books$: Observable<any>;
  loading$: Observable<boolean>;
  booksSearchByName$: Observable<Array<any>>;

  books: Array<Book>;

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.route.queryParams.subscribe(param => {
      if (param && param.keyword) {
        this.store.dispatch(getBooksByKeyword({ keyword: param.keyword }));
      }
    });

    this.loading$ = this.store.pipe(select(selectLoading));
    this.booksSearchByName$ = this.store.pipe(select(selectSearchBookByKeywordList));
  }

  onSearch(keyword: string) {
    keyword = keyword.split(' ').join('+');
    this.router.navigate(['/client/books/search'], { queryParams: { keyword } });
  }

}

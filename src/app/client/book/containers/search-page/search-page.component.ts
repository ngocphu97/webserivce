import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectBookList, selectLoading, selectSearchBookByKeywordList } from 'src/app/admin/product/store/selector';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/admin/product/models';
import { getBooksByKeyword } from 'src/app/admin/product/store/actions';

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

  keyword: string;
  books: Array<Book>;

  constructor(private store: Store<any>, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(y => {
      this.keyword = y.keyword
      this.store.dispatch(getBooksByKeyword({ keyword: this.keyword }));
    });

    this.loading$ = this.store.pipe(select(selectLoading));
    this.booksSearchByName$ = this.store.pipe(select(selectSearchBookByKeywordList));
  }

  onSearch(keyword: string) {
    keyword = keyword.split(' ').join('+');
    this.router.navigate(['/client/books/search'], { queryParams: { keyword } });
  }


}

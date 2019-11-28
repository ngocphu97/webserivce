import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { HistorySearchBook } from 'src/app/admin/product/models/history-search-book.model';
import { selectCurrentBook, selectBookLocationBySku } from 'src/app/admin/product/store/selector';
import { getBookById, getBookLocationBySku, addBookHistorySearch } from 'src/app/admin/product/store/actions';

@Component({
  selector: 'app-deatail-page',
  templateUrl: './deatail-page.component.html',
  styleUrls: ['./deatail-page.component.css']
})
export class DeatailPageComponent implements OnDestroy {

  subscriptions: Subscription;
  historySubscriptions: Subscription;

  book$: Observable<any>;
  bookLocation$: Observable<any>;

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute
  ) {

    this.subscriptions = this.route.params.pipe().subscribe(params => {
      if (params['id']) {
        this.store.dispatch(getBookById({ bookId: params['id'] }));
      }
      if (params['sku']) {
        this.store.dispatch(getBookLocationBySku({ sku: params['sku'] }))
      }
    })

    this.bookLocation$ = this.store.pipe(select(selectBookLocationBySku));
    this.book$ = this.store.pipe(select(selectCurrentBook));

    this.historySubscriptions = this.book$.subscribe(book => {
      if (book) {
        const historySearchBook: HistorySearchBook = {
          dateSearch: new Date(),
          name: book.name,
          sku: book.sku,
        }
        this.store.dispatch(addBookHistorySearch({ historySearchBook }))
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.historySubscriptions.unsubscribe();
  }

}

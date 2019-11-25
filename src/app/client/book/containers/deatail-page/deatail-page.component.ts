import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getBookById, getBookLocationBySku } from 'src/app/admin/product/store/actions';
import { ActivatedRoute } from '@angular/router';
import { selectCurrentBook, selectBookLocationBySku } from 'src/app/admin/product/store/selector';

@Component({
  selector: 'app-deatail-page',
  templateUrl: './deatail-page.component.html',
  styleUrls: ['./deatail-page.component.css']
})
export class DeatailPageComponent implements OnInit, OnDestroy {

  subscriptions: Subscription;
  book$: Observable<any>;
  bookLocation$: Observable<any>;

  constructor(private store: Store<any>, private route: ActivatedRoute) {

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

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

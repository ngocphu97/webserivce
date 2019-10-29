import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Book } from 'src/app/admin/product/models';
import { getTopSearchBooksByTime } from 'src/app/admin/product/store/actions';
import { selectTopSearch } from 'src/app/admin/product/store/selector';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  topSearchBooks$: Observable<Array<Book>>;
  
  constructor(private store: Store<any>) {
    this.store.dispatch(getTopSearchBooksByTime({ time: 7 }));
    this.topSearchBooks$ = this.store.pipe(select(selectTopSearch));

    this.topSearchBooks$.subscribe(x => console.log(x));
  }

  ngOnInit() {

  }


}

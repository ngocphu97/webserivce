import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getBookList } from '../../store/actions';

import { Book } from '../../models';
import * as fromBooksSelector from '../../store/selector';

@Component({
  selector: 'app-add-import-proposal-page',
  templateUrl: './add-import-proposal-page.component.html',
  styleUrls: ['./add-import-proposal-page.component.css']
})
export class AddImportProposalPageComponent implements OnInit {

  books$: Observable<Array<Book>>;

  constructor(private store: Store<any>) {
    this.store.dispatch(getBookList());
    this.books$ = this.store.pipe(select(fromBooksSelector.selectBookList));
   }

  ngOnInit() {
  }

}

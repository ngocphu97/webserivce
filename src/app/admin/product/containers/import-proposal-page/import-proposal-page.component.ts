import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Book } from '../../models';
import { getBookList } from '../../store/actions';
import * as fromBooksSelector from '../../store/selector';

@Component({
  selector: 'app-import-proposal-page',
  templateUrl: './import-proposal-page.component.html',
  styleUrls: ['./import-proposal-page.component.css']
})
export class ImportProposalPageComponent implements OnInit {

  books$: Observable<Array<Book>>;

  constructor(private store: Store<any>) { 
    this.store.dispatch(getBookList());
    this.books$ = this.store.pipe(select(fromBooksSelector.selectBookList));
  }

  ngOnInit() {
  }
}

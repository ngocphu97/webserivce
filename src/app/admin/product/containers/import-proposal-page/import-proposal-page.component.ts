import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Book } from '../../models';
import { getBookList, getProposalList, updateProposal } from '../../store/actions';
import * as fromBooksSelector from '../../store/selector';
import { Proposal } from '../../models/proposal.model';

@Component({
  selector: 'app-import-proposal-page',
  templateUrl: './import-proposal-page.component.html',
  styleUrls: ['./import-proposal-page.component.css']
})
export class ImportProposalPageComponent implements OnInit {
      
  proposalList$: Observable<Array<Proposal>>;
  books$: Observable<Array<Book>>;

  constructor(private store: Store<any>) {
    this.store.dispatch(getBookList());
    this.store.dispatch(getProposalList());

    this.books$ = this.store.pipe(select(fromBooksSelector.selectBookList));
    this.proposalList$ = this.store.pipe(select(fromBooksSelector.selectProposalList));
  }

  ngOnInit() { }

  onSaveProposal(proposal: Proposal) {
    this.store.dispatch(updateProposal({ proposal }));
  }
}

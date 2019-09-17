import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import { ExploreModel, Search } from '../../models';
import { ExploreService } from '../../store/services';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss']
})
export class ExplorePageComponent {
  exploredList$: Observable<Array<ExploreModel>>;
  pending$: Observable<boolean>;
  totalInterest$: Observable<number>;

  selectedInterest: ExploreModel = null;

  constructor(
    private store: Store<fromStore.ExploreState>,
    private exploreService: ExploreService
  ) {
    this.exploredList$ = this.store.pipe(select(fromStore.selectAllExplore));
    this.pending$ = this.store.pipe(select(fromStore.selectExplorePending));
    this.totalInterest$ = this.store.pipe(select(fromStore.selectTotalExplore));
    this.exploredList$ = this.store.pipe(select(fromStore.selectAllExplore));
  }

  onSelectInterest(interest: ExploreModel) {
    this.selectedInterest = interest;
  }

  onSearch(search: Search): void {
    this.store.dispatch(fromStore.getExploreList({ search: search }))
  }
}

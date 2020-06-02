import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { ExploreService } from '../services';
import { Search } from '../../models';
import * as exploreActions from '../actions'

@Injectable()
export class ExploreEffect {

  getExploredList$ = createEffect(() => this.actions$.pipe(
    ofType(exploreActions.getExploreList),
    map((action) => action.search),
    exhaustMap((search: Search) => {
      return this.exploreService.getExploreList(search.keyword, search.country).pipe(
        map((res: any) => {

          const exploredList = res.data.map(explore => {
            return {
              ...explore,
              type: 'adInterest'
            }
          })

          return exploreActions.getExploreListSuccessfully({ exploredList })
        }),
        catchError(error => of(exploreActions.getExploreListFailure({ error: error })))
      );
    })
  ));

  getAdSuggestionList$ = createEffect(() => this.actions$.pipe(
    ofType(exploreActions.getAdSuggestionList),
    map((action) => action.search),
    exhaustMap((search: Search) => {
      return this.exploreService.getAdinterestSuggestion(search.keyword).pipe(
        map((res: any) => {
          return exploreActions.getAdSuggestionListSuccessfully({
            adSuggestionList: res.data
          })
        }),
        catchError(error => of(exploreActions.getAdSuggestionListFailure({ error: error })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private exploreService: ExploreService
  ) { }
}

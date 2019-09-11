import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import { ExploreService } from '../services';
import { Search } from '../../models';
import * as exploreActions from '../actions'

@Injectable()
export class ExploreEffect {

  getExploredList$ = createEffect(() => this.actions$.pipe(
    ofType(exploreActions.getExploreList),
    map((action: any) => action.search),
    exhaustMap((search: Search) => {
      return this.userService.getExploreList(search.keyword, search.country).pipe(
        map((res: any) => exploreActions.getExploreListSuccessfully({ exploredList: res.data })),
        catchError(error => of(exploreActions.getExploreListFailure({ error: error })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private userService: ExploreService
  ) { }

}

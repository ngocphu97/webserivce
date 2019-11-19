import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {  catchError, exhaustMap, map } from 'rxjs/operators';

import * as fromActions from './category.actions'
import { DashboardService } from '../../services/dashboard.service';


@Injectable()
export class CategoriesEffect {

  getCategoriesList$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getCategoriesList),
    exhaustMap(() => {
      return this.service.getBookCategories().pipe(
        map((categories: any) => {
          return fromActions.getCategoriesListSuccess({ categoriesList: categories })
        }),
        catchError(error => of(fromActions.getCategoriesListFail({ error: error })))
      );
    })
  ));

  getCategoriesForAmount$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getCategoryForAmount),
    exhaustMap(() => {
      return this.service.getCategoryForAmount().pipe(
        map((categories: any) => {
          return fromActions.getCategoryForAmountSuccess({ categoryForAmountList: categories })
        }),
        catchError(error => of(fromActions.getCategoriesListFail({ error: error })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private service: DashboardService,
  ) { }

}

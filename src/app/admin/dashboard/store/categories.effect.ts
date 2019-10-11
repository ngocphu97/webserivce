import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {  catchError, exhaustMap, map } from 'rxjs/operators';

import * as fromActions from './categories.actions'
import { DashboardService } from '../services/dashboard.service';
// import { MatSnackBar } from '@angular/material';

@Injectable()
export class CategoriesEffect {

  getCategoriesList$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getCategoriesList),
    exhaustMap(() => {
      return this.service.getBookCategories().pipe(
        map((res: any) => {
          return fromActions.getCategoriesListSuccess({ categoriesList: res })
        }),
        catchError(error => of(fromActions.getCategoriesListFail({ error: error })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private service: DashboardService,
    // private snackBar: MatSnackBar
  ) { }

  // private openSnackBar(message: string, action: string): void {
  //   this.snackBar.open(message, action, {
  //     duration: 2000,
  //   });
  // }

}

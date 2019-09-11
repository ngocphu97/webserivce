import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import * as bookActions from '../actions'
import { BookService } from '../../service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class BookEffect {

	getBookList$ = createEffect(() => this.actions$.pipe(
		ofType(bookActions.getBookList),
		exhaustMap(() => {
			return this.bookService.getBookList().pipe(
				map((res: any) => bookActions.getBookListSuccess({ bookList: res })),
				catchError(error => of(bookActions.getBookListFail({ error: error })))
			);
		})
	));

	addBook$ = createEffect(() => this.actions$.pipe(
		ofType(bookActions.addBook),
		map((action: any) => action.book),
		exhaustMap((book) => {
			return this.bookService.addBook(book).pipe(
				map((res: any) => {
					this.openSnackBar('Add book success', 'success');
					return bookActions.addBookSuccess({ book: book })
				}),
				catchError(error => of(bookActions.getBookListFail({ error: error })))
			)
		})
	));

	constructor(
		private actions$: Actions,
		private bookService: BookService,
		private snackBar: MatSnackBar
	) { }

	openSnackBar(message: string, action: string): void {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

}

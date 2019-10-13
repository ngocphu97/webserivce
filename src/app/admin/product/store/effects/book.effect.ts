import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import * as bookActions from '../actions'
import { BookService } from '../../service';
import { MatSnackBar } from '@angular/material';
import { Book } from '../../models/book.model';

@Injectable()
export class BookEffect {

	getBookList$ = createEffect(() => this.actions$.pipe(
		ofType(bookActions.getBookList),
		exhaustMap(() => {
			return this.bookService.getBookList().pipe(
				map((res: any) => {
					return bookActions.getBookListSuccess({ bookList: res })
				}),
				catchError(error => of(bookActions.getBookListFail({ error: error })))
			);
		})
	));

	addBook$ = createEffect(() => this.actions$.pipe(
		ofType(bookActions.addBook),
		map((action: any) => action.book),
		exhaustMap((book) => {
			return this.bookService.addBook(book).pipe(
				map((res) => {
					this.openSnackBar('Add book success', 'success');
					return bookActions.addBookSuccess({
						book: {
							...book,
							id: res.insertId
						}
					})
				}),
				catchError(error => of(bookActions.getBookListFail({ error: error })))
			)
		})
	));

	getBookById$ = createEffect(() => this.actions$.pipe(
		ofType(bookActions.getBookById),
		map((action: any) => action.bookId),
		exhaustMap((bookId) => {
			return this.bookService.getBookById(bookId).pipe(
				map((res: Book) => {
					return bookActions.getBookByIdSuccess({ book: res })
				}),
				catchError(error => of(bookActions.getBookListFail({ error: error })))
			)
		})
	));

	deleteBookById$ = createEffect(() => this.actions$.pipe(
		ofType(bookActions.deleteBook),
		map((action: any) => action.book),
		exhaustMap((book) => {
			return this.bookService.deleteBookById(book.id).pipe(
				map(() => {
					this.openSnackBar('Delete book success', 'success');
					return bookActions.deleteBookSuccess({ bookId: book.id });
				}),
				catchError(error => of(bookActions.deleteBookError({ error: error })))
			)
		})
	));

	updateBookById$ = createEffect(() => this.actions$.pipe(
		ofType(bookActions.updateBookById),
		map((action: any) => action.book),
		exhaustMap((book) => {
			return this.bookService.updateBookById(book).pipe(
				map(() => {
					this.openSnackBar('Update book success', 'success');
					return bookActions.updateBookByIdSuccess({ book: book });
				}),
				catchError(error => of(bookActions.updateBookByIdFail({ error: error })))
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

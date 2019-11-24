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

  getBookTopSearch$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.getTopSearchBooksByTime),
    exhaustMap((action) => {
      return this.bookService.getBookTopSearch(action.time).pipe(
        map((res: any) => {
          console.log(res);
          return bookActions.getTopSearchBooksByTimeSuccess({ topBooks: res });
        }),
        catchError(error => of(bookActions.getTopSearchBooksByTimeFail({ error: error })))
      );
    })
  ));

  getBookLocation$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.getBookLocationBySku),
    map(action => action.sku),
    exhaustMap((sku: number) => {
      return this.bookService.getBookLocationBySKU(sku).pipe(
        map((res: any) => bookActions.getBookLocationBySkuSuccess({ bookLocation: res[0] })),
        catchError(error => of(bookActions.getBookLocationBySkuFail({ error: error })))
      );
    })
  ));

  addBook$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.addBook),
    map((action: any) => action.book),
    exhaustMap((book) => {
      const addBook = { ...book };
      delete addBook.photo;
      return this.bookService.addBook(addBook).pipe(
        map((res) => {
          if (book.photo) {
            this.bookService.addBookCover(book.photo, res.insertId).subscribe(res => console.log(res));
          } else {
            this.bookService.addBookCover('https://www.blueinkreview.com/wp-c ontent/uploads/2016/07/nocover-1.jpg', res.insertId).subscribe(res => console.log(res));
          }

          return bookActions.getBookList();
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

  updateBookCover$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.updateBookCover),
    map((action: any) => action.bookCover),
    exhaustMap((bookCover) => {
      return this.bookService.updateBookCover(bookCover).pipe(
        map((res) => {
          console.log('Log Message: BookEffect -> res', res);
          return bookActions.getBookList();
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

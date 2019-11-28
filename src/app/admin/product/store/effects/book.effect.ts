import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { MatSnackBar } from '@angular/material';

import * as bookActions from '../actions'
import { BookService } from '../../service';
import { Book, AddBook } from '../../models/book.model';
import { Router } from '@angular/router';

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
          return bookActions.getTopSearchBooksByTimeSuccess({ topBooks: res });
        }),
        catchError(error => of(bookActions.getTopSearchBooksByTimeFail({ error: error })))
      );
    })
  ));

  getBookLocationBySku$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.getBookLocationBySku),
    map(action => action.sku),
    exhaustMap((sku: number) => {
      return this.bookService.getBookLocationBySKU(sku).pipe(
        map((res: any) => bookActions.getBookLocationBySkuSuccess({ bookLocation: res[0] })),
        catchError(error => of(bookActions.getBookLocationBySkuFail({ error: error })))
      );
    })
  ));

  getBookLocationList$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.getBookLocationList),
    exhaustMap(() => {
      return this.bookService.getBookLocationList().pipe(
        map((res: any) => bookActions.getBookLocationListSuccess({ bookLocationList: res })),
        catchError(error => of(bookActions.getBookLocationListFail({ error: error })))
      );
    })
  ));

  addBook$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.addBook),
    map((action: any) => action.book),
    exhaustMap((book: AddBook) => {

      const addBook = { ...book };
      delete addBook.photo;
      delete addBook.location;

      return this.bookService.addBook(addBook).pipe(
        map((res) => {

          if (book.photo) {
            this.bookService.addBookCover(book.photo, res.insertId).subscribe(res => console.log(res));
          } else {
            this.bookService.addBookCover(
              'https://www.blueinkreview.com/wp-content/uploads/2016/07/nocover-1.jpg', 
              res.insertId).subscribe(res => console.log(res));
          }

          if (res.insertId) {
            const location = {
              book_id: res.insertId,
              bookshelf_id: book.location,
            };
            this.bookService.addBookLocation(location).subscribe();
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
      console.log('Log Message: BookEffect -> book', book);
      return this.bookService.deleteBookById(book.id).pipe(
        map(() => {
          this.openSnackBar('Đã xóa thành công', ' ');
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
          this.openSnackBar('Cập nhật sách thành công', '_');
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
        map(() => {
          return bookActions.getBookList();
        }),
        catchError(error => of(bookActions.updateBookCoverFail({ error: error })))
      )
    })
  ));

  updateBookLoctionsEntity$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.updateBookEntityLocation),
    exhaustMap((action) => {
      return this.bookService.updateBookLocation(action.bookLocationEntity).pipe(
        map(() => {
          return bookActions.updateBookEntityLocationSuccess();
        }),
        catchError(error => of(bookActions.updateBookEntityLocationFail({ error: error })))
      )
    })
  ));

  getProposalList$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.getProposalList),
    exhaustMap(() => {
      return this.bookService.getProposalList().pipe(
        map((res) => {
          return bookActions.getProposalListSuccess({ proposalList: res });
        }),
        catchError(error => of(bookActions.getProposalListFail({ error: error })))
      )
    })
  ));

  getBooksByKeyword$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.getBooksByKeyword),
    exhaustMap((action) => {
      return this.bookService.getBookByKeyword(action.keyword).pipe(
        map((res) => {
          return bookActions.getBooksByKeywordSuccess({ searchBooks: res });
        }),
        catchError(error => of(bookActions.getBooksByKeywordFail({ error: error })))
      )
    })
  ));

  addBookHistorySearch$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.addBookHistorySearch),
    exhaustMap((action) => {
      return this.bookService.addBookHistorySearch(action.historySearchBook).pipe(
        map((res) => {
          return bookActions.addBookHistorySearchSuccess();
        }),
        catchError(error => of(bookActions.addBookHistorySearchFail({ error: error })))
      )
    })
  ));

  updateProposal$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.updateProposal),
    map((action: any) => action.proposal),
    exhaustMap((proposal) => {
      return this.bookService.updateProposalById(proposal).pipe(
        map(() => {
          this.openSnackBar('Cập nhật yêu cầu thêm sách thành công', ' ');
          return bookActions.updateProposalSuccess({ id: proposal.id });
        }),
        catchError(error => of(bookActions.updateProposalFail({ error: error })))
      )
    })
  ));

  addProposal$ = createEffect(() => this.actions$.pipe(
    ofType(bookActions.addProposal),
    map((action: any) => action.proposal),
    exhaustMap((proposal) => {
      return this.bookService.addProposal(proposal).pipe(
        map((res) => {
          this.openSnackBar('Thêm thành công', ' ');
          this.router.navigate(['admin/books/proposal-import']);
          return bookActions.addProposalSuccess({ proposal: { ...proposal, id: res.insertId } });
        }),
        catchError(error => of(bookActions.addProposalFail({ error: error })))
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from '../../models/book.model';
import { BookState } from '../../store/reducers';
import { addBook } from '../../store/actions';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})
export class AddProductPageComponent {

  // pending$ = this.store.pipe(select(LoginPageSelectors.selectLoginPagePending));
  // error$ = this.store.pipe(select(LoginPageSelectors.selectLoginPageError));

  constructor(
    private store: Store<BookState>,
    private snackBar: MatSnackBar
  ) { }

  onAddBook(book: Book) {
    this.store.dispatch(addBook({ book: book }));
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

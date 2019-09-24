import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
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
    private store: Store<State>,
    private snackBar: MatSnackBar
  ) { }

  onAddBook(book) {

    const book1 = {
      ...book,
      cost: parseFloat(book.cost),
      inventory: parseFloat(book.inventory),
      retailPrice: parseFloat(book.retailPrice),
      totalPage: parseInt(book.totalPage),
      review: '123'
    }

    this.store.dispatch(addBook({ book: book }));
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

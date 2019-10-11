import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { addBook } from '../../store/actions';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})
export class AddProductPageComponent {

  constructor(private store: Store<State>) { }

  onAddBook(book) {
    this.store.dispatch(addBook({ book: book }));
  }

}

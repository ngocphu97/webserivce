import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Book } from '../../models/book.model';

import { BookState } from '../../store/reducers/book.reducer';
import { getBookList } from '../../store/actions';
import * as fromSelector from '../../store/selector';
import { BookService } from '../../service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {

  books$: Observable<Array<Book>>;
  pending$: Observable<boolean>;

  imageBlobUrl: any;

  constructor(private store: Store<BookState>, private service: BookService) {
    this.store.dispatch(getBookList());

    this.books$ = this.store.pipe(select(fromSelector.selectBookList));
    this.pending$ = this.store.pipe(select(fromSelector.selectBookPending));

    this.demo();
  }

  demo() {
    this.service.getBookPhotoByBookId(1).pipe()
      .subscribe(x => {
        this.createImageFromBlob(x[0].photo.data);
      });
  }

  createImageFromBlob(image) {
    let TYPED_ARRAY = new Uint8Array(image);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => { return data + String.fromCharCode(byte); }, '');

    let base64String = btoa(STRING_CHAR);

    this.imageBlobUrl = `data:image/jpg;base64,${base64String}`;
  }

}

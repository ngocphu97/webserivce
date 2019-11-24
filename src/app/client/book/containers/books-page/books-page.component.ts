import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable} from 'rxjs';
import { selectBookList } from 'src/app/admin/product/store/selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksPageComponent {

  p: number = 1;

  books$: Observable<any>;
  bookLocation$: Observable<any>;

  constructor(private store: Store<any>) {
    this.books$ = this.store.pipe(select(selectBookList));
  }

}

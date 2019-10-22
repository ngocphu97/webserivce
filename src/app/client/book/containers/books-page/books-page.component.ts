import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable} from 'rxjs';
import { selectBookList } from 'src/app/admin/product/store/selector';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksPageComponent implements OnInit {

  x = [1, 2, 3, 5, 6, 7, 8, 9, 0, 0, 1, 1];
  p: number = 1;
  categories = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
    { value: 'tacos-2', viewValue: 'Tacos' },
    { value: 'tacos-2', viewValue: 'Tacos' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  books$: Observable<any>;
  books: any;

  constructor(private store: Store<any>) {

    this.books$ = this.store.pipe(select(selectBookList));
  }

  ngOnInit() {
  }

}

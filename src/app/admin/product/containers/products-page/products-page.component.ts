import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { State } from '../../store/reducers/book.reducer';
import { getBookList, addBook, addBookCover } from '../../store/actions';
import * as fromBooksSelector from '../../store/selector';
import * as fromCategoriesSelector from '../../../dashboard/store/category/category.selector';
import { getCategoriesList } from 'src/app/admin/dashboard/store/category/category.actions';
import { AddProductFormComponent } from '../../components';
import { Categories } from 'src/app/admin/dashboard/models/categories.model';
import { takeUntilDestroy } from '@app/core/destroyable';
import { AddBook, Book } from '../../models';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {

  books$: Observable<any>;
  categories$: Observable<any>;
  loading$: Observable<boolean>;

  filterValue: string = '';
  categories: Array<Categories>
  findBook: Book;

  constructor(
    private store: Store<State>,
    public dialog: MatDialog
  ) {
    this.store.dispatch(getBookList());
    this.store.dispatch(getCategoriesList());

    this.books$ = this.store.pipe(select(fromBooksSelector.selectBookList));
    this.loading$ = this.store.pipe(select(fromBooksSelector.selectLoading));
    this.categories$ = this.store.pipe(select(fromCategoriesSelector.selectCategoriesList));

    this.books$.subscribe(x => console.log(x));

    this.categories$.pipe(
      takeUntilDestroy(this)
    ).subscribe((cats: Array<Categories>) => {
      if (cats) {
        this.categories = cats
      }
    });
  }

  applyFilter(event) {
    this.filterValue = event.target.value;
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(AddProductFormComponent, {
      width: '900px',
      data: {
        categories: this.categories
      }
    })

    dialogRef.afterClosed().subscribe((result: AddBook) => {
      if (result) {
        this.store.dispatch(addBook({ book: result }));
      }
    });
  }
}


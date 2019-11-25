import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { takeUntilDestroy } from '@app/core/destroyable';
import { ConfirmDialogComponent } from '@app/shared/dialog';

import { AddProductFormComponent } from '../../components';

import { AddBook, Book } from '../../models';
import { BookLocation } from '../../models/book-location.model';
import { Categories } from 'src/app/admin/dashboard/models/categories.model';

import { State } from '../../store/reducers/book.reducer';

import { getBookList, addBook, deleteBook, getBookLocationList } from '../../store/actions';
import { getCategoriesList } from 'src/app/admin/dashboard/store/category/category.actions';

import * as fromBooksSelector from '../../store/selector';
import * as fromCategoriesSelector from '../../../dashboard/store/category/category.selector';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {

  books$: Observable<any>;
  categories$: Observable<any>;
  locations$: Observable<Array<BookLocation>>;
  loading$: Observable<boolean>;

  filterValue: string = '';
  categories: Array<Categories>;
  locations: Array<BookLocation>;
  findBook: Book;

  constructor(
    private store: Store<State>,
    public dialog: MatDialog
  ) {
    this.store.dispatch(getBookList());
    this.store.dispatch(getCategoriesList());
    this.store.dispatch(getBookLocationList());

    this.books$ = this.store.pipe(select(fromBooksSelector.selectBookList));
    this.loading$ = this.store.pipe(select(fromBooksSelector.selectLoading));
    this.categories$ = this.store.pipe(select(fromCategoriesSelector.selectCategoriesList));
    this.locations$ = this.store.pipe(select(fromBooksSelector.selectBookLoction));

    this.categories$
      .pipe(takeUntilDestroy(this))
      .subscribe((cats: Array<Categories>) => {
        if (cats) {
          this.categories = cats
        }
      });

    this.locations$
      .pipe(takeUntilDestroy(this))
      .subscribe((locations: Array<BookLocation>) => {
        if (locations) {
          this.locations = locations
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
        categories: this.categories,
        locations: this.locations
      }
    })

    dialogRef.afterClosed().subscribe((result: AddBook) => {
      if (result) {
        this.store.dispatch(addBook({ book: result }));
      }
    });
  }

  onDeleteBook(book: Book) {
    this.dialog
      .open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: 'Delete book',
          message: 'Are you sure to delete this book?'
        }
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(deleteBook({ book }));
        }
      });
  }
}


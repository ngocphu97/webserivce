import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material';

import { ConfirmDialogComponent } from '@app/shared/dialog';

import { State } from '../../store/reducers';
import { Book } from '../../models/book.model';
import { selectCurrentBook, selectBookLoction } from '../../store/selector';
import { getCategoriesList } from 'src/app/admin/dashboard/store/category/category.actions';
import { selectCategoriesList } from 'src/app/admin/dashboard/store/category/category.selector';
import { deleteBook, getBookById, getBookList, updateBookCover, getBookLocationList, updateBookEntityLocation, updateBookById } from '../../store/actions';

@Component({
  selector: 'app-detail-product-page',
  templateUrl: './detail-product-page.component.html',
  styleUrls: ['./detail-product-page.component.scss']
})
export class DetailProductPageComponent {

  selectedBook$: Observable<any>;
  categoryList$: Observable<any>;
  bookshelfLoctions$: Observable<any>;
  bookId: number;

  constructor(
    private router: Router,
    private store: Store<State>,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.route.paramMap.subscribe(params => {
      this.bookId = parseInt(params.get('bookId'), 0);
      this.store.dispatch(getBookById({ bookId: this.bookId }));
    });

    this.store.dispatch(getCategoriesList());
    this.store.dispatch(getBookList());
    this.store.dispatch(getBookLocationList());

    this.selectedBook$ = this.store.pipe(select(selectCurrentBook));
    this.categoryList$ = this.store.pipe(select(selectCategoriesList));
    this.bookshelfLoctions$ = this.store.pipe(select(selectBookLoction));
  }

  onDeleteBook(book: Book) {
    this.dialog
      .open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: 'Xóa sách',
          message: 'Bạn có chắc muốn xóa sách ?'
        }
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(deleteBook({ book }));
          this.router.navigate(['/admin/books']);
        }
      });
  }

  onEditBook(book) {
    this.store.dispatch(updateBookById({ book }));

    this.store.dispatch(updateBookEntityLocation({
      bookLocationEntity: {
        bookId: this.bookId,
        bookshelfId: book.bookshelfId
      }
    }));
  }

  onEditCoverPhoto(coverPhoto) {
    this.store.dispatch(updateBookCover({ bookCover: coverPhoto }));
  }
}

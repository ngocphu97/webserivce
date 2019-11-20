import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Book } from '../../models/book.model';
import { State } from '../../store/reducers';
import { deleteBook, getBookById, getBookList, updateBookById, updateBookCover } from '../../store/actions';
import { selectCurrentBook } from '../../store/selector';
import { getCategoriesList } from 'src/app/admin/dashboard/store/category/category.actions';
import { selectCategoriesList } from 'src/app/admin/dashboard/store/category/category.selector';
import { ConfirmDialogComponent } from '@app/shared/dialog';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-detail-product-page',
  templateUrl: './detail-product-page.component.html',
  styleUrls: ['./detail-product-page.component.scss']
})
export class DetailProductPageComponent {

  selectedBook$: Observable<any>;
  categoryList$: Observable<any>;
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
    this.selectedBook$ = this.store.pipe(select(selectCurrentBook));
    this.categoryList$ = this.store.pipe(select(selectCategoriesList));

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
          this.router.navigate(['/admin/books']);
        }
      });
  }

  onEditBook(book) {
    this.store.dispatch(updateBookById({ book: { ...book, id: this.bookId } }));
  }

  onEditCoverPhoto(coverPhoto) {
    this.store.dispatch(updateBookCover({ bookCover: coverPhoto }));
  }
}

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ConfirmDialogComponent } from '@app/shared/dialog';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnChanges {

  @Input() selectedBook: any;
  @Output() deleteBook = new EventEmitter<Book>();

  constructor(public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedBook) {
      this.selectedBook = {
        ...this.selectedBook,
        image: this.convertImage(this.selectedBook.photo.data)
      }
    }
  }

  convertImage(image) {
    let typedArray = new Uint8Array(image);
    const stringChar = typedArray.reduce((data, byte) => data + String.fromCharCode(byte), '');
    let base64String = btoa(stringChar);

    return `data:image/jpg;base64,${base64String}`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: 'Are you sure you want to delete this book?',
        title: 'Delete book'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.onDeleteBook() : 'true';
    });
  }

  onDeleteBook() {
    this.deleteBook.emit(this.selectedBook);
  }
}

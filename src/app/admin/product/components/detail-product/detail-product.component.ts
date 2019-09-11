import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book.model';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '@app/shared/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  @Input() selectedBook: Book;
  @Output() deleteBook = new EventEmitter<Book>();

  constructor( public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.selectedBook);
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

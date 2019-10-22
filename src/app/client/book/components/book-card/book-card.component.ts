import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BookDetailDialogComponent } from '../book-detail-dialog/book-detail-dialog.component';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit, OnChanges {


  @Input() book: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.book) {
      if (this.book.photo) {
        console.log('Log Message: BookCardComponent -> ngOnChanges -> this.book', this.book);

        this.book = {
          ...this.book,
          image: this.convertImage(this.book.photo.data),
          bookLocation: {
            x: 1,
            y: 1
          }
        }
      } else {
        this.book = {
          ...this.book,
          image: 'https://www.uoduckstore.com/TDS%20Product%20Images/Barchart%20Chemistry_1.jpg',
          bookLocation: {
            x: 1,
            y: 1
          }
        }
      }

    }
  }

  openDialog() {
    this.dialog.open(BookDetailDialogComponent, {
      width: '850px',
      data: {
        ...this.book,
        bookLocation: {
          x: 370,
          y: 240
        }
      }
    });
  }

  convertImage(image) {
    let typedArray = new Uint8Array(image);
    const stringChar = typedArray.reduce((data, byte) => data + String.fromCharCode(byte), '');
    let base64String = btoa(stringChar);

    return `data:image/jpg;base64,${base64String}`;
  }

}

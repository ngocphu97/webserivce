import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() book: any;
  @Input() bookLocation: any;
  
  constructor() { }

  ngOnInit() {
    this.book = {
      ...this.book,
      image: this.book.photo ? this.book.photo : 'https://www.uoduckstore.com/TDS%20Product%20Images/Barchart%20Chemistry_1.jpg',
      bookLocation: {
        x: 1,
        y: 1
      }
    }
  }

}

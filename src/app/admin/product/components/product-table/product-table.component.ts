import { Component, Input, ViewChild, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatPaginator, MatInput, MatTableDataSource } from '@angular/material';
import { Book } from '../../models';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnChanges {

  @Input() books: Array<any>;
  @Input() categories: Array<any>;
  @Input() pending: boolean;
  @Input() filter: string = '';
  @Input() findBook: Book;

  @Output() deleteBook = new EventEmitter<Book>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('search', { static: true }) exploreFieldInput: MatInput;

  selectedRowIndex: number = -1;
  interestList: Array<string> = [];
  selection = new SelectionModel<any>(true, []);
  dataSource: MatTableDataSource<any>;
  imageBlobUrl: any;
  selectedBook: any;
  displayedColumns: string[] = ['image', 'name', 'category', 'cost', 'inventory', 'amount', 'action'];

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.books) {
      this.categories = this.categories.map(cat => {
        return {
          ...cat,
          category_id: cat.id
        }
      });

      this.books = this.books.map(book => {
        this.categories.filter(cat => {
          if (cat.id === book.category_id) {
            return book = {
              ...book,
              categoryName: cat.name
            }
          }
        });

        return {
          ...book,
          image: book.photo ? book.photo : 'https://www.blueinkreview.com/wp-content/uploads/2016/07/nocover-1.jpg'
        }
      });

      this.dataSource = new MatTableDataSource(this.books);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

    if (changes.filter) {
      this.dataSource.filter = this.filter.trim().toLowerCase();
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(row) {
    this.selectedBook = row;
    this.selectedRowIndex = row.id;

    this.router.navigate([`/admin/books/${row.id}`]);
  }

  stopPropagation(event): void {
    event.stopPropagation()
  }

  onDeleteBook(book) {
    this.deleteBook.emit(book);
  }

  importProposal(book) {
    console.log('Log Message: ProductTableComponent -> importProposal -> book', book);
  }

}

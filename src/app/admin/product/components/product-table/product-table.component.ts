import { Component, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatPaginator, MatInput, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnChanges {

  @Input() books: Array<any>;
  @Input() categories: Array<any>;
  @Input() pending: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('search', { static: true }) exploreFieldInput: MatInput;

  selectedRowIndex: number = -1;
  interestList: Array<string> = [];
  selection = new SelectionModel<any>(true, []);
  dataSource: MatTableDataSource<any>;
  imageBlobUrl: any;
  selectedBook: any;

  booksFake: Array<any> = [];

  displayedColumns: string[] = [
    'id', 'image', 'name', 'category', 'cost', 'inventory', 'amount', 'action'
  ];

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.books && changes.categories) {
      this.categories = this.categories.map(cat => {
        return {
          ...cat,
          category_id: cat.id
        }
      })

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
          image: 'https://cdn.shopify.com/s/files/1/0221/1146/products/Order_of_the_Phoenix_Paperback_large.png?v=1548842107'
        }
      })

      this.dataSource = new MatTableDataSource(this.books);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  convertImage(image) {
    let typedArray = new Uint8Array(image);
    const stringChar = typedArray.reduce((data, byte) => data + String.fromCharCode(byte), '');
    let base64String = btoa(stringChar);

    return `data:image/jpg;base64,${base64String}`;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(row) {
    this.selectedBook = row;
    this.selectedRowIndex = row.id;
    
    this.selection.toggle(row);
    if (this.selection.isSelected(row)) {
      return this.interestList.push(row.name);
    }
    return this.interestList = this.interestList.filter(x => x !== row.name);
  }

  stopPropagation(event): void {
    event.stopPropagation()
  }

  onSelectBookDetail(bookId: string) {
    this.router.navigate([`/admin/books/${bookId}`]);
  }
}

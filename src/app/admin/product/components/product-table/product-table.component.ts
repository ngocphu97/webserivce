import { Component, Input, ViewChild, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatPaginator, MatInput, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {

  @Input() books: Array<any>;
  @Input() pending: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('search', { static: true }) exploreFieldInput: MatInput;

  selectedRowIndex: number = -1;
  interestList: Array<string> = [];
  selection = new SelectionModel<any>(true, []);
  dataSource: MatTableDataSource<any>;
  imageBlobUrl: any;

  booksFake: Array<any> = [];

  displayedColumns: string[] = [
    'select', 'name', 'image', 'author', 'translator', 'language',
    'retailPrice', 'cost', 'inventory', 'amount', 'action',
  ];

  constructor(private router: Router) { 
    // this.generateFakeDB();
  }

  generateFakeDB() {
    for (let i = 0; i < 10; i++) {
      const x = {
        id: i,
        name: "Book " + i,
        author: "Author " + i,
        cost: 100 + i,
        retailPrice: 100 + i,
        inventory: 100 + i,
        distributor: "Distributor " + i,
        language: "Viêt Nam",
        size: "14 * 14",
        totalPage: i,
        translator: "Transaltor " + i,
        publishDate: new Date(),
        amount: 200 + i,
        image: 'https://cdn.shopify.com/s/files/1/0221/1146/products/Order_of_the_Phoenix_Paperback_large.png?v=1548842107',
        description: "Description "+ 1,
      }
      this.booksFake.push(x);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.books) {
      // this.books = this.books.map(book => {
      //   return {
      //     ...book,
      //     image: this.convertImage(book.photo.data)
      //   }
      // })
      this.dataSource = new MatTableDataSource(this.booksFake);
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
    this.selection.toggle(row);
    if (this.selection.isSelected(row)) {
      return this.interestList.push(row.name);
    }
    return this.interestList = this.interestList.filter(x => x !== row.name);
  }

  stopPropagation(event): void {
    event.stopPropagation()
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.clearSelection();
    } else {
      this.dataSource.data.forEach(row => {
        this.interestList.push(row.name);
        this.selection.select(row)
      });
    }
  }

  clearSelection(): void {
    this.selection.clear();
    this.interestList = [];
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    } else {
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
  }

  onSelectBookDetail(bookId: string) {
    this.router.navigate([`/admin/books/${bookId}`]);
  }
}

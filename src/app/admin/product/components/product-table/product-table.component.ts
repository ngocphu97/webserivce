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

  displayedColumns: string[] = [
    'select', 'name', 'author', 'translator', 'language',
    'retailPrice', 'cost', 'inventory', 'amount', 'action',
  ];

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.books) {

      // this.books = this.books.map(book => {
      //   return {
      //     ...book,
      //     image: this.convertImage(book.photo.data)
      //   }
      // })

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

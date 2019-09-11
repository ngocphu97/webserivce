import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatSort, MatPaginator, MatInput, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { ExploreModel, Search, countries } from 'src/app/explore/models';
import { Country } from 'src/app/explore/models/country.model.';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  @Input() books: Array<Book>;
  @Input() pending: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('search', { static: true }) exploreFieldInput: MatInput;

  selectedRowIndex: number = -1;
  interestList: Array<string> = [];
  selection = new SelectionModel<ExploreModel>(true, []);
  displayConutries: Array<Country> = countries;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['select', 'image', 'name', 'author', 'amount', 'action'];

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.books) {
      this.dataSource = new MatTableDataSource(this.books);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
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

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  addBook() {

  }
}

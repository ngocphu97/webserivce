import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-import-proposal-table',
  templateUrl: './import-proposal-table.component.html',
  styleUrls: ['./import-proposal-table.component.scss']
})
export class ImportProposalTableComponent implements OnInit, OnChanges {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() books: any;
  editBook = false;
  filteredStates: Observable<any>;

  ELEMENT_DATA = [
    { id: 1, name: 'Lần nhập 1', edit: false, bookName: 'Tôi thấy hoa vàng trên cỏ xanh', amount: 100, date: new Date(), status: true },
    { id: 2, name: 'Lần nhập 1', edit: false, bookName: 'Khởi Nghiệp Tinh Gọn(The Lean Startup)', amount: 100, date: new Date(), status: false },
    { id: 3, name: 'Lần nhập 2', edit: false, bookName: 'Connan', amount: 100, date: new Date(), status: false },
    { id: 4, name: 'Lần nhập 2', edit: false, bookName: 'IT Chapter 2', amount: 100, date: new Date(), status: true },
    { id: 5, name: 'Lần nhập 2', edit: false, bookName: 'Làm bạn với bầu trời', amount: 100, date: new Date(), status: false },
    { id: 6, name: 'Lần nhập 2', edit: false, bookName: 'Ba Gã Cùng Thuyền (Tái Bản 2019)', amount: 100, date: new Date(), status: false },
    { id: 7, name: 'Lần nhập 3', edit: false, bookName: 'IT Chapter 2', amount: 100, date: new Date(), status: false },
    { id: 8, name: 'Lần nhập 3', edit: false, bookName: 'Ba Gã Cùng Thuyền (Tái Bản 2019)', amount: 100, date: new Date(), status: true },
    { id: 9, name: 'Lần nhập 3', edit: false, bookName: 'Tôi thấy hoa vàng trên cỏ xanh', amount: 100, date: new Date(), status: true },
    { id: 10, name: 'Lần nhập 4', edit: false, bookName: 'Ba Gã Cùng Thuyền (Tái Bản 2019)', amount: 100, date: new Date(), status: false },
    { id: 11, name: 'Lần nhập 5', edit: false, bookName: 'IT Chapter 2', amount: 100, date: new Date(), status: false },
    { id: 12, name: 'Lần nhập 5', edit: false, bookName: 'Khởi Nghiệp Tinh Gọn(The Lean Startup)', amount: 100, date: new Date(), status: true },
  ];

  displayedColumns: string[] = ['name', 'bookName', 'amount', 'date', 'status', 'action'];

  stateCtrl = new FormControl();
  selectImport = null;
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor() {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.books) {

      this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map((state) => {
            const bookName = state ? state : this.selectImport.bookName;
            this.selectImport.bookName = bookName;
            return state ? this._filterStates(state) : this.books.slice();
          })
        );
    }
  }

  updateStatus(element) {
    this.selectImport = element;
    this.selectImport.status = true;
  }

  onChangeBookAmount(newAmount) {
    this.selectImport.amount = newAmount;
  }

  edit(element) {
    this.selectImport = this.ELEMENT_DATA.filter(e => e.id === element.id)[0]
    this.stateCtrl.setValue(this.selectImport.bookName);
    this.selectImport.edit = !this.selectImport.edit;
  }

  changeBookName(element, newBook) {
    const ele = this.ELEMENT_DATA.filter(e => e.id === element.id)[0];
    ele.bookName = newBook;
  }

  save(element) {
    const ele = this.ELEMENT_DATA.filter(e => e.id === element.id)[0];
    ele.edit = !ele.edit;
  }

  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();
    return this.books.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

}

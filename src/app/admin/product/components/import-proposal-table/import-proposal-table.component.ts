import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Proposal } from '../../models/proposal.model';

@Component({
  selector: 'app-import-proposal-table',
  templateUrl: './import-proposal-table.component.html',
  styleUrls: ['./import-proposal-table.component.scss']
})
export class ImportProposalTableComponent implements OnInit, OnChanges {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() books: any;
  @Input() proposalImport: any = [];

  @Output() proposal = new EventEmitter<Proposal>();

  editBook = false;
  filteredStates: Observable<any>;
  data: Array<any>;

  displayedColumns: string[] = ['bookName', 'amount', 'date', 'status', 'action'];

  stateCtrl = new FormControl();
  selectImport = null;
  dataSource: MatTableDataSource<any>;
  selectedRowIndex: number = -1;

  constructor( public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.proposalImport) {

      if (this.proposalImport) {
        this.data = this.proposalImport.map(pro => {
          return {
            ...pro,
            bookName: pro.bookName === null ? 'null' : pro.bookName,
            status: pro.status === "false" || !pro.status ? false : true,
            edit: false,
          }
        });

        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    }

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

  emitProposal() {
    const proposal = {
      id: this.selectImport.id,
      bookId: this.selectImport.bookId,
      amount: this.selectImport.amount,
      date: this.selectImport.date,
      status: this.selectImport.status
    }
    this.proposal.emit(proposal);
  }

  updateStatus(element) {
    this.selectImport = element;
    this.selectImport.status = true;
    this.emitProposal();
  }

  
  onChangeBookAmount(newAmount) {
    this.selectImport.amount = parseInt(newAmount, 0);
  }

  edit(element) {
    this.selectedRowIndex = element.id;
    this.selectImport = this.data.filter(e => e.id === element.id)[0]
    this.stateCtrl.setValue(this.selectImport.bookName);
    this.selectImport.edit = !this.selectImport.edit;
  }

  changeBookName(element, newBook) {
    const ele = this.data.filter(e => e.id === element.id)[0];
    ele.bookName = newBook;
    this.selectImport.bookId = ele.bookId;
  }

  save(element) {
    this.selectedRowIndex = -1;
    const ele = this.data.filter(e => e.id === element.id)[0];
    ele.edit = !ele.edit;
    this.emitProposal();
  }

  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();
    return this.books.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

}

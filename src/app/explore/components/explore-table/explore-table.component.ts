import { Component, ViewEncapsulation, OnInit, OnChanges, Input, Output, ViewChild, SimpleChanges, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatSort, MatPaginator, MatInput, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { ExploreModel, Search, countries, AdSuggestion } from '../../models';
import { Country } from '../../models/country.model.';

@Component({
  selector: 'app-explore-table',
  templateUrl: './explore-table.component.html',
  styleUrls: ['./explore-table.component.scss', './flag.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExploreTableComponent implements OnInit, OnChanges {

  @Input() exploredList: Array<ExploreModel>;
  @Input() suggestionList: Array<AdSuggestion>;
  @Input() totalExplore: number;
  @Input() pending: boolean;

  @Output() exploredKeyword: EventEmitter<Search>;
  @Output() getSuggestionList: EventEmitter<Search>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('search', { static: true }) exploreFieldInput: MatInput;

  country: FormControl;
  selectedRowIndex: number = -1;
  interestList: Array<string> = [];
  selection = new SelectionModel<ExploreModel>(true, []);
  displayConutries: Array<Country> = countries;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['select', 'name', 'audience_size', 'keyword', 'type', 'search'];
  value = '';
  selectionMessage = 'Click interests below to add them to your selection.'
  facebookLink = 'https://www.facebook.com/search/pages/?q=';
  googleLink = 'https://www.google.com/search?q=';
  removable = true;
  adType = 'adInterest';

  constructor(private snackBar: MatSnackBar) {
    this.exploredKeyword = new EventEmitter();
    this.getSuggestionList = new EventEmitter();
    this.country = new FormControl(this.displayConutries[0].code);
  }

  ngOnInit() {
    this.exploreFieldInput.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.exploredList) {
      this.setUpDataSource(this.exploredList);
    }

    if (changes && changes.suggestionList) {
      this.setUpDataSource(this.suggestionList);
    }
  }

  setUpDataSource(listData) {
    this.dataSource = new MatTableDataSource(listData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchExplore(keyword: string): void {
    const search: Search = {
      keyword: keyword,
      country: this.country.value
    }

    if (this.adType === 'adInterest') {
      return this.exploredKeyword.emit(search);
    }

    return this.getSuggestionList.emit(search);
  }

  clearInput(): void {
    this.value = ''
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
      return this.clearSelection();
    }

    return this.dataSource.data.forEach(row => {
      this.interestList.push(row.name);
      this.selection.select(row)
    });
  }

  clearSelection(): void {
    this.selection.clear();
    this.interestList = [];
  }

  checkboxLabel(row?: ExploreModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  removeChip(chip: string): void {
    this.interestList = this.interestList.filter(interest => interest !== chip);
    const row = this.selection.selected.find(selected => selected.name === chip);
    this.selection.toggle(row);
  }

  selectAll(): void {
    this.masterToggle();
  }

  copyToClipBoard(): void {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.interestList.toString();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.openSnackBar('Coppied to clipboard', 'Cool')
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  adInterestSelect() {
    this.adType = 'adInterest';
    this.setUpDataSource(this.exploredList);
  }

  adInterestSuggestionSelect(keyword: string) {
    this.adType = 'adInterestSuggestion';
    const search: Search = {
      keyword: keyword,
      country: this.country.value
    }

    this.getSuggestionList.emit(search);
  }

}

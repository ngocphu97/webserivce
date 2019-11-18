import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ConfirmDialogComponent } from '@app/shared/dialog';
import { Book } from '../../models/book.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnChanges {

  @Input() selectedBook: any;
  @Input() categories: any;

  @Output() deleteBook = new EventEmitter<Book>();
  @Output() editingBook = new EventEmitter<Book>();

  @ViewChild('bookName', { static: true }) bookNameInput: ElementRef;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  visible = true;
  removable = false;
  addOnBlur = true;
  selectable = true;
  isEdit = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
  ) {

    this.firstFormGroup = this._formBuilder.group({
      name: [{ value: '', disabled: true }],
      category_id: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      distributor: [{ value: '', disabled: true }],
      language: [{ value: '', disabled: true }],
      publishDate: [{ value: '', disabled: true }],
      translator: [{ value: '', disabled: true }],
    });

    this.secondFormGroup = this._formBuilder.group({
      amount: [{ value: undefined, disabled: true }],
      cost: [{ value: undefined, disabled: true }],
      inventory: [{ value: undefined, disabled: true }],
      retailPrice: [{ value: undefined, disabled: true }],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedBook) {

      this.firstFormGroup.patchValue({
        name: this.selectedBook.name,
        category_id: this.selectedBook.category_id,
        description: this.selectedBook.description,
        distributor: this.selectedBook.distributor,
        language: this.selectedBook.language,
        publishDate: this.selectedBook.publishDate,
        translator: this.selectedBook.translator
      });

      this.secondFormGroup.patchValue({
        amount: this.selectedBook.amount,
        cost: this.selectedBook.cost,
        inventory: this.selectedBook.inventory,
        retailPrice: this.selectedBook.retailPrice,
      });

      this.selectedBook = {
        ...this.selectedBook,
        image: this.selectedBook.photo
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: 'Are you sure you want to delete this book?',
        title: 'Delete book'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.onDeleteBook() : 'true';
    });
  }

  onDeleteBook() {
    this.deleteBook.emit(this.selectedBook);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.categories.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(fruit): void {
    const index = this.categories.indexOf(fruit);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  editBook() {
    this.firstFormGroup.get(['name']).enable();
    this.firstFormGroup.get(['category_id']).enable();
    this.firstFormGroup.get(['description']).enable();
    this.firstFormGroup.get(['distributor']).enable();
    this.firstFormGroup.get(['publishDate']).enable();
    this.firstFormGroup.get(['translator']).enable();

    this.secondFormGroup.get(['amount']).enable();
    this.secondFormGroup.get(['cost']).enable();
    this.secondFormGroup.get(['inventory']).enable();
    this.secondFormGroup.get(['retailPrice']).enable();

    this.bookNameInput.nativeElement.focus();
    this.isEdit = true;
  }

  saveBook() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);

    const editBook = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    }

    this.editingBook.emit(editBook);
  }
}


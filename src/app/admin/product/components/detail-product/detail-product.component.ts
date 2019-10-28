import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

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
  @Output() deleteBook = new EventEmitter<Book>();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  categories = [];

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
  ) {
    this.firstFormGroup = this._formBuilder.group({
      bookName: [''],
      categoryName: [''],
      description: [''],
      distributor: [''],
      language: [''],
      publishDate: [''],
      translator: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      amount: [],
      cost: [],
      inventory: [],
      retailPrice: []
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedBook) {

      this.firstFormGroup.patchValue({
        bookName: this.selectedBook.name,
        categoryName: this.selectedBook.categoryName,
        description: this.selectedBook.description,
        distributor: this.selectedBook.distributor,
        language: this.selectedBook.language,
        publishDate: this.selectedBook.publishDate,
        translator: this.selectedBook.translator
      })
      this.categories = [this.selectedBook.categoryName];

      this.secondFormGroup.patchValue({
        amount: this.selectedBook.amount,
        cost: this.selectedBook.cost,
        inventory: this.selectedBook.inventory,
        retailPrice: this.selectedBook.retailPrice,
      });

      this.selectedBook = {
        ...this.selectedBook,
        // image: this.convertImage(this.selectedBook.photo.data)
      }
    }
  }

  convertImage(image) {
    let typedArray = new Uint8Array(image);
    const stringChar = typedArray.reduce((data, byte) => data + String.fromCharCode(byte), '');
    let base64String = btoa(stringChar);

    return `data:image/jpg;base64,${base64String}`;
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
}

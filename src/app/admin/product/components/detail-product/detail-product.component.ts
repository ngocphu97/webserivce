import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

import { MatDialog } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { ConfirmDialogComponent } from '@app/shared/dialog';
import { Book } from '../../models/book.model';

declare const firebase: any;

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnChanges {

  @Input() selectedBook: any;
  @Input() categories: any;
  @Input() bookshelfLoctions: Array<any>;

  @Output() deleteBook = new EventEmitter<Book>();
  @Output() editingBook = new EventEmitter<Book>();
  @Output() coverURL = new EventEmitter<string>();
  @Output() updateBookCover = new EventEmitter();

  @ViewChild('bookName', { static: true }) bookNameInput: ElementRef;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  visible = true;
  removable = false;
  addOnBlur = true;
  selectable = true;
  isEdit = false;

  uploadProcess = 0;

  previewImage = null;
  uploadedImageUrl = null;

  uploadMode = false;
  uploadSuccess = false;

  uploadImages = [];
  uploadingImages = [];

  storageRef = firebase.storage().ref();

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
      locationName: [{ value: '', disabled: true }],
      bookshelfId: [{ value: null, disabled: true }],
    });

    this.secondFormGroup = this._formBuilder.group({
      amount: [{ value: undefined, disabled: true }],
      cost: [{ value: undefined, disabled: true }],
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
        translator: this.selectedBook.translator,
        bookshelfId: this.selectedBook.bookshelfId,
        locationName: this.selectedBook.locationName + this.selectedBook.locationDescription
          ? this.selectedBook.locationName + ' - ' + this.selectedBook.locationDescription
          : 'Chưa có'
      });

      this.secondFormGroup.patchValue({
        amount: this.selectedBook.amount,
        cost: this.selectedBook.cost,
        retailPrice: this.selectedBook.retailPrice,
      });

      this.selectedBook = {
        ...this.selectedBook,
        image: this.selectedBook.photo
      }
    }
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
    this.firstFormGroup.get(['locationName']).enable();
    this.firstFormGroup.get(['bookshelfId']).enable();

    this.secondFormGroup.get(['amount']).enable();
    this.secondFormGroup.get(['cost']).enable();
    this.secondFormGroup.get(['retailPrice']).enable();

    this.bookNameInput.nativeElement.focus();
    this.isEdit = true;
  }

  cancel() {
    this.firstFormGroup.get(['name']).disable();
    this.firstFormGroup.get(['category_id']).disable();
    this.firstFormGroup.get(['description']).disable();
    this.firstFormGroup.get(['distributor']).disable();
    this.firstFormGroup.get(['publishDate']).disable();
    this.firstFormGroup.get(['translator']).disable();

    this.secondFormGroup.get(['amount']).disable();
    this.secondFormGroup.get(['cost']).disable();
    this.secondFormGroup.get(['retailPrice']).disable();

    this.isEdit = false;
  }

  saveBook() {
    const editBook = {
      id: this.selectedBook.id,
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    }

    this.editingBook.emit(editBook);
  }


  onSelectImage(image: any) {
    const uploadImage = image.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(uploadImage);

    setTimeout(() => {
      this.uploadSuccess = true;
      this.uploadImageToFirebase(uploadImage);
    }, 1000);
  }

  uploadImageToFirebase(uploadImage) {
    const metadata = {
      contentType: 'image/jpeg'
    };

    const uploadTask = this.storageRef
      .child(uploadImage.name)
      .put(uploadImage, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => this.catchUploadProcess(snapshot),
      (error) => this.catchUploadError(error));

    uploadTask.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        if (url) {
          this.uploadSuccess = false;
          this.uploadedImageUrl = url;
          this.updateBookCover.emit({ bookId: this.selectedBook.id, photo: url });
        }
      });
    });
  }

  catchUploadProcess(snapshot): number {
    return this.uploadProcess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  }

  catchUploadError(error: any) {
    switch (error.code) {
      case 'storage/unauthorized':
        alert('storage/unauthorized');
        this.uploadProcess = -1;
        break;
      case 'storage/canceled':
        alert('storage/canceled');
        this.uploadProcess = -1;
        break;
      case 'storage/unknown':
        alert('storage/unknown');
        this.uploadProcess = -1;
        break;
    }
  }

  selectUploadMode() {
    this.uploadMode = true;
  }
}


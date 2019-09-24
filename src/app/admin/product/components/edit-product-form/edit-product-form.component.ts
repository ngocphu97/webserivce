import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';

import { Book } from '../../models/book.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroy } from '@app/core/destroyable';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent implements OnInit, OnChanges {

  @Input() selectedBook: Book;

  @Output() editBook: EventEmitter<any>;

  form: FormGroup;
  formErrors: any;

  constructor(private formBuilder: FormBuilder) {

    this.editBook = new EventEmitter();

    this.form = this.formBuilder.group({
      id: [null, Validators.required],
      amount: [null, Validators.required],
      author: [null, Validators.required],
      cost: [null, Validators.required],
      description: [null, Validators.required],
      distributor: [null, Validators.required],
      image: [null, Validators.required],
      inventory: [null, Validators.required],
      language: [null, Validators.required],
      name: [null, Validators.required],
      publishDate: [null, Validators.required],
      retailPrice: [null, Validators.required],
      size: [null, Validators.required],
      totalPage: [null, Validators.required],
      translator: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntilDestroy(this)
    ).subscribe(() => {
      this.onEditBookFormValuesChanged();
    });

    console.log(this.selectedBook);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedBook) {
      this.form.patchValue({
        id: this.selectedBook.id,
        amount: this.selectedBook.amount,
        author: this.selectedBook.author,
        cost: this.selectedBook.cost,
        description: this.selectedBook.description,
        distributor: this.selectedBook.distributor,
        image: this.selectedBook.image,
        inventory: this.selectedBook.inventory,
        language: this.selectedBook.language,
        name: this.selectedBook.name,
        publishDate: this.selectedBook.publishDate,
        retailPrice: this.selectedBook.retailPrice,
        size: this.selectedBook.size,
        totalPage: this.selectedBook.totalPage,
        translator: this.selectedBook.translator,
      })
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.editBook.emit(this.form.value);
  }

  private onEditBookFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      this.formErrors[field] = {};
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

}

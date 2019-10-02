import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { takeUntilDestroy } from '@app/core/destroyable';

import { Book } from '../../models/book.model';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {

  @Output() addBook: EventEmitter<Book>;

  form: FormGroup;
  formErrors: any;

  constructor(private formBuilder: FormBuilder) {

    this.addBook = new EventEmitter<Book>();

    this.formErrors = {
      name: { required: true },
      author: { required: true },
      cost: { required: true },
      retailPrice: { required: true },
      amount: { required: true },
      inventory: { required: true },
      distributor: { required: true },
      language: { required: true },
      publishDate: { required: true }
    };

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      author: [null, Validators.required],
      cost: [null, Validators.required],
      retailPrice: [null, Validators.required],
      amount: [null, Validators.required],
      inventory: [null, Validators.required],
      distributor: [null, Validators.required],
      language: [null, Validators.required],
      publishDate: [null, Validators.required],
      size: [null],
      totalPage: [null],
      translator: [null],
      description: [null],
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntilDestroy(this)
    ).subscribe(() => {
      this.onAddBookFormValuesChanged();
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    // if (!this.form.controls['image'].value) {
    //   this.form.patchValue({
    //     image: 'https://www.uoduckstore.com/TDS%20Product%20Images/Matrix%20Parent%20Generic_1.jpg'
    //   })
    // };

    this.addBook.emit(this.form.value);

    Object.keys(this.form.controls).forEach(control => {
      this.form.controls[control].markAsPristine();
    });
  }

  private onAddBookFormValuesChanged() {
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

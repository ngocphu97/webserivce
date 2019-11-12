import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { takeUntilDestroy } from '@app/core/destroyable';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {

  form: FormGroup;
  formErrors: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.formErrors = {
      name: { required: true },
      category: { required: true },
      sku: { required: true },
      author: { required: true },
      cost: { required: true },
      retailPrice: { required: true },
      amount: { required: true },
      distributor: { required: true },
      publishDate: { required: true }
    };

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      category_id: [null, Validators.required],
      sku: [null, Validators.required],
      author: [null, Validators.required],
      cost: [null, Validators.required],
      retailPrice: [null, Validators.required],
      amount: [null, Validators.required],
      distributor: [null, Validators.required],
      language: [null],
      publishDate: [null, Validators.required],
      description: [null],
      photo: [null]
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntilDestroy(this)
    ).subscribe(() => {
      this.onAddBookFormValuesChanged();
    });
  }

  onCoverURL(coverUrl: string) {
    this.form.controls['photo'].setValue(coverUrl);
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    Object.keys(this.form.controls).forEach(control => {
      this.form.controls[control].markAsPristine();
    });

    this.dialogRef.close(this.form.value)
  }

  onNoClick() {
    this.dialogRef.close();
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

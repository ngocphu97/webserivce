import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';

import {
  MatProgressSpinnerModule,
  MatTableModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatStepperModule,
  MatChipsModule,
  MatRippleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { COMPONENTS, DialogComponent, AddProductFormComponent } from './components';
import { CONTAINERS } from './containers';

import { DialogModule } from '@app/shared/dialog';
import { MatFileUploadModule } from 'angular-material-fileupload';

const MAT_MODULES = [
  MatProgressSpinnerModule,
  MatTableModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatChipsModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatStepperModule,
  MatChipsModule,
  MatRippleModule,
  MatProgressBarModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFileUploadModule,

    FlexLayoutModule,
    ProductRoutingModule,

    MAT_MODULES,
    DialogModule
  ],
  declarations: [
    ...CONTAINERS,
    ...COMPONENTS
  ],
  entryComponents: [
    DialogComponent,
    AddProductFormComponent
  ],
  providers: [],

})
export class ProductModule { }

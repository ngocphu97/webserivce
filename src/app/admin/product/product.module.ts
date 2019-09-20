import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
  MatChipsModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { COMPONENTS, DialogComponent } from './components';
import { CONTAINERS } from './containers';

import { reducer } from './store/reducers/book.reducer';
import { BookEffect } from './store/effects/book.effect';
import { SERVICES } from './service';
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
  MatDialogModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forFeature('book', reducer),
    EffectsModule.forFeature([BookEffect]),
    MatFileUploadModule,

    FlexLayoutModule,
    ProductRoutingModule,

    MAT_MODULES,
    DialogModule
  ],
  providers: [
    ...SERVICES
  ],
  declarations: [
    ...CONTAINERS,
    ...COMPONENTS
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class ProductModule { }

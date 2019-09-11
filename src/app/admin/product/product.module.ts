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
  MatListModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';

import { reducer } from './store/reducers/book.reducer';
import { BookEffect } from './store/effects/book.effect';
import { SERVICES } from './service';
import { DialogModule } from '@app/shared/dialog';

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
  MatListModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    

    StoreModule.forFeature('book', reducer),
    EffectsModule.forFeature([BookEffect]),

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
})
export class ProductModule { }

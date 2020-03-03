import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  MatRippleModule,
  MatTooltipModule,
  MatAutocompleteModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { CONTAINERS } from './containers';
import { DialogModule } from '@app/shared/dialog';
import { ProductRoutingModule } from './product-routing.module';
import { COMPONENTS, DialogComponent, AddProductFormComponent } from './components';

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
  MatProgressBarModule,
  MatTooltipModule,
  MatAutocompleteModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

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
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],

})
export class ProductModule { }

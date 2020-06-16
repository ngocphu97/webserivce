import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatSortModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatInputModule,
  MatChipsModule,
  MatButtonModule,
  MatSelectModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { containers } from './containers';
import { DialogModule } from '@app/shared/dialog';
import { ManageRoutingModule } from './manage-routing.module';

import { reducer } from './store/reducers';
import { ManageEffect } from './store/effects';
import { ManageService } from './store/services';

const MAT_MODULES = [
  MatCardModule,
  MatSortModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatInputModule,
  MatChipsModule,
  MatButtonModule,
  MatSelectModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    containers
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,

    MAT_MODULES,
    DialogModule,
    ManageRoutingModule,

    StoreModule.forFeature('manage', reducer),
    EffectsModule.forFeature([ManageEffect])
  ],
  providers: [
    ManageService
  ]
})
export class ManageModule { }

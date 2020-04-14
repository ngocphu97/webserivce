import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  MatSortModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatChipsModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
} from '@angular/material';


import { DialogModule } from '@app/shared/dialog';
import { ExploreRoutingModule } from './explore-routing.module';

import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';

import { reducer } from './store/reducers';
import { ExploreEffect } from './store/effects';
import { ExploreService } from './store/services';

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
  MatMenuModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MAT_MODULES,
    DialogModule,
    ExploreRoutingModule,

    StoreModule.forFeature('explore', reducer),
    EffectsModule.forFeature([ExploreEffect])
  ],
  declarations: [
    CONTAINERS,
    COMPONENTS
  ],
  providers: [
    ExploreService
  ]
})
export class ExploreModule { }

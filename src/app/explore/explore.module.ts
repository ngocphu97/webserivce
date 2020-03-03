import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatMenuModule
} from '@angular/material';

import { ExploreRoutingModule } from './explore-routing.module';

import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';

import { ExploreEffect } from './store/effects';
import { ExploreService } from './store/services';

import * as fromExplore from './store/reducers/explore.reducer';
import { entityConfig, defaultDataServiceConfig } from './explore-entity-metadata';
import { EntityDataModule, DefaultDataServiceConfig } from '@ngrx/data';

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
    MAT_MODULES,
    ExploreRoutingModule,
    ReactiveFormsModule,

    StoreModule.forFeature('explore', fromExplore.reducer),
    EffectsModule.forFeature([ExploreEffect]),
    EntityDataModule.forRoot(entityConfig),
  ],
  declarations: [
    CONTAINERS,
    COMPONENTS
  ],
  providers: [
    ExploreService,
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ]
})
export class ExploreModule { }

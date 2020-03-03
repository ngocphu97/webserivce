import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManageRoutingModule } from './manage-routing.module';
import { containers } from './containers';

import {
  MatProgressSpinnerModule, MatTableModule, MatCardModule,
  MatFormFieldModule, MatInputModule, MatSortModule,
  MatIconModule, MatButtonModule, MatSelectModule,
  MatPaginatorModule, MatProgressBarModule, MatToolbarModule,
  MatCheckboxModule, MatChipsModule, MatSnackBarModule,
  MatMenuModule
} from '@angular/material';
import { reducer } from './store/reducers/manage.reducer';
import { ManageEffect } from './store/effects';
import { entityConfig, defaultDataServiceConfig } from './manage-entity-metadata';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { EntityDataModule, DefaultDataServiceConfig } from '@ngrx/data';
import { ManageService } from './store/services';

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
  declarations: [
    containers
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageRoutingModule,

    MAT_MODULES,

    StoreModule.forFeature('manage', reducer),
    EffectsModule.forFeature([ManageEffect]),
    // EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    ManageService,
    // {
    //   provide: DefaultDataServiceConfig,
    //   useValue: defaultDataServiceConfig
    // }
  ]
})
export class ManageModule { }

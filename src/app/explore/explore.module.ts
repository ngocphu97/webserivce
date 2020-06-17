import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input/typings';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { DialogModule } from '@app/shared/dialog';
import { ExploreRoutingModule } from './explore-routing.module';

import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';

import { reducer } from './store/reducers';
import { ExploreEffect } from './store/effects';
import { ExploreService } from './store/services';
import { CommonLayoutModule } from '@app/shared/common-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

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
    MatMenuModule,

    DialogModule,
    ExploreRoutingModule,

    StoreModule.forFeature('explore', reducer),
    EffectsModule.forFeature([ExploreEffect]),

    CommonLayoutModule
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

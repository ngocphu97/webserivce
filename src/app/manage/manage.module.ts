import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '@angular/cdk/layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { containers } from './containers';
import { DialogModule } from '@app/shared/dialog';
import { ManageRoutingModule } from './manage-routing.module';

import { reducer } from './store/reducers';
import { ManageEffect } from './store/effects';
import { ManageService } from './store/services';
import { CommonLayoutModule } from '@app/shared/common-layout';

import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    containers
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,

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

    DialogModule,
    ManageRoutingModule,

    StoreModule.forFeature('manage', reducer),
    EffectsModule.forFeature([ManageEffect]),

    CommonLayoutModule
  ],
  providers: [
    ManageService
  ]
})
export class ManageModule { }

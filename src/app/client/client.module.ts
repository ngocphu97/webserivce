import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { CONTAINERS } from './containers';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatCardModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { adminReducer } from '../admin/reducers';
import { CategoriesEffect } from '../admin/dashboard/store/category/category.effect';
import { BookEffect } from '../admin/product/store/effects/book.effect';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookService } from '../admin/product/service';
import { DashboardService } from '../admin/dashboard/services/dashboard.service';

const MATERIALS = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatCardModule,
  MatTooltipModule
] 

@NgModule({
  declarations: [CONTAINERS],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature([CategoriesEffect, BookEffect]),

    MATERIALS
  ],
  providers: [
    BookService,
    DashboardService
  ],
})
export class ClientModule { }

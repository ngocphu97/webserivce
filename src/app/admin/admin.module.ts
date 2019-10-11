import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule,
} from '@angular/material';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent, AdminToolbarComponent, AdminSidebarComponent } from './layout';
import { BookService } from './product/service';
import { adminReducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffect } from './dashboard/store/categories.effect';
import { BookEffect } from './product/store/effects/book.effect';
import { DashboardService } from './dashboard/services/dashboard.service';

const MAT_MODULES = [
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSnackBarModule
];

@NgModule({
  imports: [
    CommonModule,
    MAT_MODULES,
    AdminRoutingModule,

    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature([CategoriesEffect, BookEffect]),
  ],
  declarations: [
    AdminLayoutComponent,
    AdminToolbarComponent,
    AdminSidebarComponent
  ],
  providers: [
    BookService,
    DashboardService
  ],
})
export class AdminModule { }

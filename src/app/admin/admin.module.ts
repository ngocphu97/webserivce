import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookService } from './product/service';
import { CategoriesEffect } from './store/categories.effect';
import { reducer } from './store/categories.reducer';

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
    AdminRoutingModule
  ],
  declarations: [
    AdminLayoutComponent,
    AdminToolbarComponent,
    AdminSidebarComponent
  ],
  providers: [
    BookService
  ]
})
export class AdminModule { }

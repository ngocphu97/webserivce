import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';

import { AdminRoutingModule } from './admin-routing.module';
import {
  AdminLayoutComponent,
  AdminToolbarComponent,
  AdminSidebarComponent
} from './layout';

const MAT_MODULES = [
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,

    MAT_MODULES,
  ],
  declarations: [
    AdminLayoutComponent,
    AdminToolbarComponent,
    AdminSidebarComponent
  ],
})
export class AdminModule { }

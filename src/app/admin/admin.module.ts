import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

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

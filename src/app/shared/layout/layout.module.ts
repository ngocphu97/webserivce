import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,

    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class LayoutModule { }

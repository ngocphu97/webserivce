import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookRoutingModule } from './book-routing.module';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatCardModule,
  MatSelectModule,
  MatDialogModule,
  MatTabsModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { BookDetailDialogComponent } from './components/book-detail-dialog/book-detail-dialog.component';
import { BooksResolve } from 'src/app/admin/product/service/book.resolve';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { NgxPaginationModule } from 'ngx-pagination';

const MATERIALS = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatCardModule,
  MatSelectModule,
  MatDialogModule,
  MatTabsModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [CONTAINERS, COMPONENTS],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    NgxPaginationModule,

    MATERIALS
  ],
  entryComponents: [
    BookDetailDialogComponent
  ],
  providers: [
    BooksResolve
  ]
})
export class BookModule { }

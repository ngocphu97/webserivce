import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

const DIALOGS = [
  AlertDialogComponent,
  ConfirmDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: DIALOGS,
  entryComponents: DIALOGS,
  exports: DIALOGS,
})
export class DialogModule { }

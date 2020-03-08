import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { FormsModule } from '@angular/forms';

const DIALOGS = [
  AlertDialogComponent,
  ConfirmDialogComponent,
  EditProfileDialogComponent
];

const MAT_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
];


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MAT_MODULES
  ],
  declarations: DIALOGS,
  entryComponents: DIALOGS,
  exports: DIALOGS,
})
export class DialogModule { }

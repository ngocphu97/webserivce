import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';

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

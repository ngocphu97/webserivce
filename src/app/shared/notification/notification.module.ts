import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatSnackBarModule } from '@angular/material';

import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  declarations: [NotificationComponent],
  entryComponents: [NotificationComponent],
  providers: [NotificationService]
})
export class NotificationModule { }

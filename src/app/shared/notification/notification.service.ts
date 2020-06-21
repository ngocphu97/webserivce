import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { NotificationComponent } from './notification.component';
import { NotificationConfig } from './notification';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  public show(options: NotificationConfig) {
    const type = options.type || 'info';
    const duration = options.config ? options.config.duration : -1;
    const panelClass = this.setupPanelClass(type);

    const config: MatSnackBarConfig = {
      duration,
      panelClass,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: {
        message: options.message,
        title: options.title,
        action: options.action,
        image: options.image,
        type,
        duration
      },
      ...options.config
    };

    this.snackBar.openFromComponent(NotificationComponent, config);
  }

  setupPanelClass(optionType: string): string {
    switch (optionType) {
      case 'error':
        return 'error-notification';

      case 'info':
        return 'info-notification';

      case 'success':
        return 'success-notification';

      case 'warn':
        return 'warning-notification';
    }
  }
}

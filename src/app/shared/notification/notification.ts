import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface NotificationConfig {
  message: string;
  type?: 'info' | 'success' | 'warn' | 'error';
  title?: string;
  action?: string;
  image?: string;
  config?: MatSnackBarConfig;
}

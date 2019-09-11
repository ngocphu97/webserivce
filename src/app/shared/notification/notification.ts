import { MatSnackBarConfig } from '@angular/material';

export interface NotificationConfig {
  message: string;
  type?: 'info' | 'success' | 'warn' | 'error';
  title?: string;
  action?: string;
  image?: string;
  config?: MatSnackBarConfig;
}

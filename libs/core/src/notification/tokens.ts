import { InjectionToken } from '@angular/core';
import { NotificationConfig } from './models';


export const NOTIFICATION_CONF = new InjectionToken<NotificationConfig>(
  'Provides a default configuration for the notifications'
);

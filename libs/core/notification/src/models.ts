import { ComponentType } from '@angular/cdk/overlay';
import { TemplateRef } from '@angular/core';
import { NotificationType } from './constants';


export interface NotificationDetails {
  contents: NotificationContents | TemplateRef<unknown> | ComponentType<unknown>;
  afterOpened?: (data?: unknown) => void;
  afterDismissed?: (data?: unknown) => void;
  onAction?: (action?: unknown) => void;
}

export interface NotificationContents {
  message: string;
  title?: string;
}

export interface NotificationConfig {
  type?: NotificationType;
  timeout?: number;
}


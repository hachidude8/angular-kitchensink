import { ComponentType } from '@angular/cdk/overlay';
import { Injectable, TemplateRef } from '@angular/core';
import { NotificationConfig } from './models';


@Injectable()
export abstract class NotificationService {
  abstract show(contents: string | TemplateRef<unknown> | ComponentType<unknown>, config: NotificationConfig): Promise<unknown>;
}

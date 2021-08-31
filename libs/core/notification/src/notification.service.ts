import { Injectable } from '@angular/core';
import { NotificationConfig, NotificationDetails } from './models';


@Injectable()
export abstract class NotificationService {
  abstract show(contents: NotificationDetails, config?: NotificationConfig): Promise<unknown>;
}

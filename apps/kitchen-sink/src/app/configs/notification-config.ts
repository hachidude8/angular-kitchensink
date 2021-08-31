import { NotificationModule, NotificationService } from '@aks/core/notification';
import { SnackbarNotificationService, SnackbarNotificationConfig } from '@aks/mat/snackbar-notification';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  imports: [
    NotificationModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: NotificationService, useExisting: SnackbarNotificationService },
    SnackbarNotificationConfig
  ]
})
export class NotificationConfig {
}

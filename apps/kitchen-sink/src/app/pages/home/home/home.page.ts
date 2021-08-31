import { ConfirmationService } from '@aks/core/confirmation';
import { NotificationService } from '@aks/core/notification';
import { SnackbarNotificationContents } from '@aks/mat/snackbar-notification';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ks-home',
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit {
  clicks = 0;
  message = {
    title: 'Kitchen sink demo',
    subtitle: 'A demo project for a project structure'
  };

  constructor(private confirmService: ConfirmationService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  confirm(): void {
    this.confirmService.confirm({ title: 'A test confirmation from service' });
  }

  notify(): void {
    this.notificationService.show({
      contents: {
        message: `There are ${ this.clicks } registered clicks.`,
        closeAction: 'Add click'
      } as SnackbarNotificationContents,
      afterDismissed: () => {
        this.clicks++;
      }
    });
  }
}

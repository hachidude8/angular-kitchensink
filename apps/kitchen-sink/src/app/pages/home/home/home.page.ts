import { ConfirmationService } from '@aks/core/confirmation';
import { FiltersService } from '@aks/core/crud';
import { NotificationService } from '@aks/core/notification';
import { SnackbarNotificationContents } from '@aks/mat/snackbar-notification';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(
    private confirmService: ConfirmationService,
    private notificationService: NotificationService,
    private filters: FiltersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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

  clearFilters(): void {
    this.filters.clear();
  }

  applyFilters(): void {
    const rand = Math.round(Math.random() * 1000);
    const even = rand % 2 === 0;
    const queryParams = {
      hello: even ? 'whatever' : 'world',
      some: even ? 'value' : 'person',
      value: rand,
      is: even ? 'even' : 'odd'
    };
    this.router.navigate([], { relativeTo: this.route, queryParams });
  }
}

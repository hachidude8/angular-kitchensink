import { NotificationService } from '@aks/core/notification';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ks-user-list-page',
  templateUrl: './user-list-page.component.html'
})
export class UserListPageComponent implements OnInit {

  showFilters = false;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    console.info(`${ this.constructor.name }::ngOnInit`);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    this.notificationService.show({ contents: { message: 'Opened filters' } });
  }
}

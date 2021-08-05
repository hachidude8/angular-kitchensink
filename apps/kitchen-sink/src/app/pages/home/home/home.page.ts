import { ConfirmationService } from '@aks/core';
import { Component } from '@angular/core';


@Component({
  selector: 'ks-home',
  templateUrl: './home.page.html'
})
export class HomePage {
  message = {
    title: 'Kitchen sink demo',
    subtitle: 'A demo project for a project structure'
  };

  constructor(private confirmService: ConfirmationService) {
  }

  confirm(): void {
    this.confirmService.confirm({ title: 'A test confirmation from service' });
  }
}

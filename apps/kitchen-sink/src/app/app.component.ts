import { Component } from '@angular/core';


@Component({
  selector: 'ks-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <mat-toolbar>
      <span>{{ title }}</span>
      <span class="spacer"></span>
      <div>
        <a mat-button [routerLink]="['home']">Home</a>
        <a mat-button [routerLink]="['users']">Users</a>
      </div>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'Kitchen Sink demo';
}

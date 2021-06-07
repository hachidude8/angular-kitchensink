import { Component } from '@angular/core';


@Component({
  selector: 'ks-root',
  template: `
    <h1>{{ title }}</h1>
    <router-outlet></router-outlet>
  `,
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kitchen-sink';
}

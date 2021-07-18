import { Component } from '@angular/core';


/**
 * Loading animation.
 * Main CSS styles are located in index.html so it works during the app initialization
 */
@Component({
  selector: 'ks-loading, [ks-loading]',
  template: `
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`
})
export class LoadingComponent {
}

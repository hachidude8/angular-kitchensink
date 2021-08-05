import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationType } from './constants';
import { NOTIFICATION_CONF } from './tokens';


function getConfigProvider(externalProvider?: Provider): Provider {
  if (externalProvider) {
    return externalProvider;
  }
  return {
    provide: NOTIFICATION_CONF,
    useValue: {
      type: NotificationType.DEFAULT,
      timeout: 0
    }
  }
}


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class NotificationModule {
  static forRoot(configProvider?: Provider): ModuleWithProviders<NotificationModule> {
    return {
      ngModule: NotificationModule,
      providers: [
        getConfigProvider(configProvider)
      ]
    }
  }
}

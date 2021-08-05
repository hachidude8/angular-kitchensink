import { Provider, Optional, SkipSelf } from '@angular/core';
import { CONFIRMATION_MESSAGE } from './tokens';
import { ConfirmDetails } from './models';
import { ConfirmationService } from './confirmation.service';


export const CONFIRMATION_MESSAGE_PROVIDER: Provider = {
  provide: CONFIRMATION_MESSAGE,
  deps: [[new Optional(), new SkipSelf(), CONFIRMATION_MESSAGE]],
  useFactory: (message: ConfirmDetails) => {
    console.info(`Configuring confirmation service message!`, message ? message : 'Using default');
    return message || { title: 'Are you sure?' };
  }
};

export const CONFIRMATION_SERVICE_PROVIDER: Provider = {
  provide: ConfirmationService,
  deps: [[new Optional(), new SkipSelf(), ConfirmationService]],
  useFactory: (service: ConfirmationService) => {
    console.info(`Configuring confirmation service!`, service ? service : 'Using default');
    return service || new ConfirmationService();
  }
}

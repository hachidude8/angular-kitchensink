import { ConfirmationService } from '@aks/core/confirmation';
import { Optional, Provider, SkipSelf } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmationService } from './mat-confirmation.service';

export const MAT_CONFIRMATION_SERVICE_PROVIDER: Provider = {
  provide: ConfirmationService,
  deps: [[new Optional(), new SkipSelf(), ConfirmationService], MatDialog],
  useFactory: (service: ConfirmationService, dialog: MatDialog) => {
    console.info(
      `Configuring material confirmation service!`,
      service ? service : 'Creating default'
    );
    return service || new MatConfirmationService(dialog);
  },
};

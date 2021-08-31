import { ConfirmationService } from '@aks/core/confirmation';
import { Optional, Provider, SkipSelf } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmationService } from './mat-confirmation.service';

export const ConfirmationServiceProvider: Provider = {
  provide: ConfirmationService,
  deps: [[new Optional(), new SkipSelf(), ConfirmationService], MatDialog],
  useFactory: (service: ConfirmationService, dialog: MatDialog) => service || new MatConfirmationService(dialog),
};

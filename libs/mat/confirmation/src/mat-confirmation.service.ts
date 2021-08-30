import {
  ConfirmationResult,
  ConfirmationService,
  ConfirmContents,
  isConfirmDetails,
  Result,
} from '@aks/core/confirmation';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({ providedIn: 'root' })
export class MatConfirmationService extends ConfirmationService {
  constructor(private dialog: MatDialog) {
    super();
  }

  confirm(contents: ConfirmContents): Promise<ConfirmationResult> {
    return new Promise<ConfirmationResult>((resolve) => {
      const config: MatDialogConfig = {
        width: '30rem',
        height: '10rem',
        autoFocus: true,
        role: 'dialog',
      };
      const dialog = isConfirmDetails(contents)
        ? this.dialog.open(ConfirmationDialogComponent, {
            data: contents,
            ...config,
          })
        : this.dialog.open(contents, config);
      dialog
        .afterClosed()
        .toPromise()
        .then((result: Result) => {
          console.info('Dialog closed', result);
          resolve(new ConfirmationResult(result));
        });

      dialog
        .backdropClick()
        .toPromise()
        .then((event) => {
          console.info('User has clicked the backdrop, cancelling', event);
          // resolve(new ConfirmationResult(Result.CANCEL));
        });
    });
  }
}

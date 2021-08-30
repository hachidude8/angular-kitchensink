import { ConfirmDetails, Result } from '@aks/core/confirmation';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ks-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styles: [],
})
export class ConfirmationDialogComponent {
  Result = Result;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDetails) {}
}

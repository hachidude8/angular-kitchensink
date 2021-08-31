import { ConfirmationModule } from '@aks/core/confirmation';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationServiceProvider } from './providers';

@NgModule({
  imports: [CommonModule, ConfirmationModule, MatButtonModule, MatDialogModule],
  declarations: [ConfirmationDialogComponent],
  exports: [ConfirmationModule],
  providers: [ConfirmationServiceProvider],
})
export class MatConfirmationModule {}

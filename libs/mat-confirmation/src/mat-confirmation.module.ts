import { ConfirmationModule } from '@aks/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MAT_CONFIRMATION_SERVICE_PROVIDER } from './providers';


@NgModule({
  imports: [
    CommonModule,
    ConfirmationModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    ConfirmationDialogComponent
  ],
  exports: [
    ConfirmationModule
  ],
  providers: [
    MAT_CONFIRMATION_SERVICE_PROVIDER
  ]
})
export class MatConfirmationModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmActionDirective } from './confirm-action.directive';
import { CONFIRMATION_MESSAGE_PROVIDER, CONFIRMATION_SERVICE_PROVIDER } from './providers';


const exported = [
  ConfirmActionDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exported,
  exports: exported,
  providers: [
    CONFIRMATION_MESSAGE_PROVIDER,
    // CONFIRMATION_SERVICE_PROVIDER
  ]
})
export class ConfirmationModule {
}

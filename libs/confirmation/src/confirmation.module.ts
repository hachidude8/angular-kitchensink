import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ConfirmActionDirective } from './directives/confirm-action.directive';


const exported = [
  ConfirmActionDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exported,
  exports: exported
})
export class ConfirmationModule {
  static forRoot(
    service: Provider
  ): ModuleWithProviders<ConfirmationModule> {
    return {
      ngModule: ConfirmationModule,
      providers: [service]
    }
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanAccessDirective } from './directives/can-access.directive';
import { IsAuthenticatedDirective } from './directives/is-authenticated.directive';
import { IsSameSubjectDirective } from './directives/is-same-subject.directive';


@NgModule({
  declarations: [
    CanAccessDirective,
    IsAuthenticatedDirective,
    IsSameSubjectDirective
  ],
  imports: [
    CommonModule
  ]
})
export class AuthorizationModule {
}

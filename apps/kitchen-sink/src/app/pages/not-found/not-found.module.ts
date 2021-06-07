import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPage } from './pages';
import { NotFoundRoutingModule } from './not-found-routing.module';


@NgModule({
  declarations: [
    NotFoundPage
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }

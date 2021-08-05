import { ConfirmationModule } from '@aks/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages';


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ConfirmationModule
  ]
})
export class HomeModule {
}

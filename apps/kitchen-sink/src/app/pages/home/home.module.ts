import { MatConfirmationModule } from '@aks/mat/confirmation';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages';


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatConfirmationModule,
    MatButtonModule
  ],
})
export class HomeModule {
}

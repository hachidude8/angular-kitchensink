import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudConfiguration } from './configs/crud';
import { AppStartup } from './configs/initializer';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CrudConfiguration
  ],
  providers: [
    AppStartup
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

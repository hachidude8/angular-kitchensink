import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudConfiguration } from './configs/crud';
import { AppStartup } from './configs/initializer';
import { NamedRoutesConfig } from './configs/named-routes-config';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CrudConfiguration,
    NamedRoutesConfig,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [
    AppStartup
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

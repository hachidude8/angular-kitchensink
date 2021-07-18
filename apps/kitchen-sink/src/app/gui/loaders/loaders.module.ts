import { NgModule } from '@angular/core';
import { LoadingComponent } from './components';


const exported = [LoadingComponent];

@NgModule({
  declarations: exported,
  exports: exported
})
export class LoadersModule {
}

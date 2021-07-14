import { ModuleWithProviders, NgModule } from '@angular/core';


@NgModule({})
export class CacheModule {
  static forRoot(): ModuleWithProviders<CacheModule> {
    return {
      ngModule: CacheModule
    }
  }
}

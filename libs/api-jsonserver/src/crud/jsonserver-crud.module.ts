import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HttpResponseSerializer } from './response-serializer';
import { HTTP_SERIALIZER } from './tokens';


@NgModule({
  providers: [
    { provide: HTTP_SERIALIZER, useFactory: () => new HttpResponseSerializer() }
  ]
})
export class JsonServerCrudModule {
  static forRoot(httpSerializer: Provider): ModuleWithProviders<JsonServerCrudModule> {
    return {
      ngModule: JsonServerCrudModule,
      providers: [
        httpSerializer
      ]
    }
  }
}

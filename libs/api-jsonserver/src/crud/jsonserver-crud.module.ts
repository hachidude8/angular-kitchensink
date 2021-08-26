import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { JsResponseSerializer } from './js-response-serializer';
import { HTTP_SERIALIZER } from './tokens';


@NgModule({
  providers: [
    { provide: HTTP_SERIALIZER, useFactory: () => new JsResponseSerializer() }
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

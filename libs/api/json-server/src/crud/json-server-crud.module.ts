import {
  DESERIALIZE_RESPONSE,
  DESERIALIZE_RESPONSE_LIST,
  REST_RESOURCES_STORAGE,
  SERIALIZE_PAYLOAD,
  SERIALIZE_REQ_OPTIONS
} from '@aks/core/crud';
import { NgModule } from '@angular/core';
import { deserializeResponseList } from './deserialize-response-list';
import { restResourcesFactory } from './rest-resources-factory';
import { serializePayload } from './serialize-payload';
import { serializeReqOptions } from './serialize-req-options';


@NgModule({
  providers: [
    { provide: REST_RESOURCES_STORAGE, useFactory: () => restResourcesFactory() },
    { provide: SERIALIZE_REQ_OPTIONS, useValue: serializeReqOptions },
    { provide: SERIALIZE_PAYLOAD, useValue: serializePayload },
    { provide: DESERIALIZE_RESPONSE_LIST, useValue: deserializeResponseList },
    { provide: DESERIALIZE_RESPONSE, useValue: undefined },
  ]
})
export class JsonServerCrudModule {
}

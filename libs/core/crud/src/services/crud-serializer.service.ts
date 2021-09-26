import { Inject, Injectable } from '@angular/core';
import { HttpOptions, RequestConf } from '../models';
import { Page } from '../page';
import { Query } from '../query';
import {
  DeserializeResponseFn,
  DeserializeResponseListFn,
  SerializePayloadFn,
  SerializeReqOptionsFn
} from '../serializers';
import { DESERIALIZE_RESPONSE, DESERIALIZE_RESPONSE_LIST, SERIALIZE_PAYLOAD, SERIALIZE_REQ_OPTIONS } from '../tokens';


@Injectable({ providedIn: 'root' })
export class CrudSerializerService {

  constructor(
    @Inject(DESERIALIZE_RESPONSE) protected deserializeResponseFn: DeserializeResponseFn<unknown, unknown>,
    @Inject(DESERIALIZE_RESPONSE_LIST) protected deserializeResponseListFn: DeserializeResponseListFn<unknown, unknown>,
    @Inject(SERIALIZE_REQ_OPTIONS) protected serializeReqOptions: SerializeReqOptionsFn,
    @Inject(SERIALIZE_PAYLOAD) protected serializePayloadFn: SerializePayloadFn<unknown, unknown>
  ) {
  }

  deserialize(response: unknown): unknown {
    return this.deserializeResponseFn(response);
  }

  deserializeList(response: unknown): Page<unknown> {
    return this.deserializeResponseListFn(response);
  }

  serializeRequestOptions(query?: Query, config?: RequestConf): HttpOptions {
    return this.serializeReqOptions(query, config);
  }

  serializePayload(payload: unknown): unknown {
    return this.serializePayloadFn(payload);
  }

}

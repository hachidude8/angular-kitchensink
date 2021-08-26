import { RequestSerializer } from '@aks/core/crud';


export class JsRequestSerializer extends RequestSerializer {
  serialize(payload: unknown): unknown {
    return payload;
  }
}

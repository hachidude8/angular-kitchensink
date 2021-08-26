import { InjectionToken } from '@angular/core';
import { RestResourceStorage } from './rest-resource';
import {
  DeserializeResponseFn,
  DeserializeResponseListFn,
  SerializeReqOptionsFn,
  SerializePayloadFn
} from './serializers';


export const REST_RESOURCES_STORAGE = new InjectionToken<RestResourceStorage>('A list of defined Rest Resources');

export const DESERIALIZE_RESPONSE = new InjectionToken<DeserializeResponseFn<unknown, unknown>>(
  'Function to deserialize a single API response'
);
export const DESERIALIZE_RESPONSE_LIST = new InjectionToken<DeserializeResponseListFn<unknown, unknown>>(
  'Function to deserialize a list of API responses'
);

export const SERIALIZE_REQ_OPTIONS = new InjectionToken<SerializeReqOptionsFn>(
  'Function to transform the provided values to HTTP Options'
);

export const SERIALIZE_PAYLOAD = new InjectionToken<SerializePayloadFn<unknown, unknown>>(
  'Function to serialize the payload to the required API format'
);

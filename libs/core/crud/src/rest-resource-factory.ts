import { isRecord } from '@aks/utils';
import { RestResource, RestResourceStorage } from './rest-resource';


export function restResourceFactory(source: Record<string, RestResource>): RestResourceStorage {
  if (!isRecord(source)) {
    throw new Error(`No values were provided`);
  }
  return Object.entries(source).reduce((resources, [key, value]) => {
    resources.set(key, value);
    return resources;
  }, new Map<string, RestResource>());
}

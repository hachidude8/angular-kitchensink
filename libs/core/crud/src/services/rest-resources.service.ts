import { Inject, Injectable } from '@angular/core';
import { RestResource, RestResourceStorage } from '../rest-resource';
import { REST_RESOURCES_STORAGE } from '../tokens';


@Injectable({ providedIn: 'root' })
export class RestResourcesService {
  constructor(@Inject(REST_RESOURCES_STORAGE) private readonly resources: RestResourceStorage) {
  }

  get(key: string): RestResource {
    const resource = this.resources.get(key);
    if (!resource) {
      throw new Error(`Requested key "${ key }" is not registered`);
    }
    return resource;
  }
}

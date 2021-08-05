import { Injectable } from '@angular/core';
import { CacheSettings } from './models';
import { CacheRef } from './cache-ref';


@Injectable({ providedIn: 'root' })
export class CacheBuilderService {

  create(settings: Partial<CacheSettings>): CacheRef {
    console.info('This will get the cache instance', settings);
    return new CacheRef();
  }

}

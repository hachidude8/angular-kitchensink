import { ResponseSerializer } from './response-serializer';
import { InjectionToken } from '@angular/core';


export const HTTP_SERIALIZER = new InjectionToken<ResponseSerializer>(
  'JSON Server HTTP Response serializer provider'
);

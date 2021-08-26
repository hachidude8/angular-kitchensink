import { HttpOptions, Query, SerializeReqOptionsFn } from '@aks/core/crud';
import { HttpParams } from '@angular/common/http';


export const serializeReqOptions: SerializeReqOptionsFn = (query?: Query) => {
  const options: HttpOptions = {
    observe: 'response',
  };
  if (query) {
    options.params = new HttpParams({
      fromObject: query?.toObject()
    })
  }
  return options;
}

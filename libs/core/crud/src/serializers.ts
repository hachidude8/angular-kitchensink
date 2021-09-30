import { HttpOptions } from './models';
import { Page } from './page';
import { Query } from './query';
import { RequestConf } from './request-conf';


export type SerializeReqOptionsFn = (query?: Query, config?: RequestConf) => HttpOptions;

export type SerializePayloadFn<T, R> = (payload: T) => R;

export type DeserializeResponseFn<T, R> = (response: T) => R;

export type DeserializeResponseListFn<T, R> = (response: T) => Page<R>;

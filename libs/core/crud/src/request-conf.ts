import { HttpResource } from './http-resource';
import { RestResource } from './rest-resource';


/**
 * Service configuration placeholder.
 */
export interface RequestConf {
  [key: string]: unknown;
}

/**
 * Generic rest service RequestConfiguration
 */
export interface GenericRequestConf extends RequestConf {
  resource: string | RestResource | HttpResource;
}

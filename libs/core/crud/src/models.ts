/**
 * Service configuration placeholder.
 */
export type RequestConf = unknown;

/**
 * Angular {@link HttpClient} options definition placeholder.
 */
export type HttpOptions = Record<string, unknown>;

/**
 *  Angular {@link HttpParams} value type placeholder.
 */
export type HttpParamType = string | number | boolean | ReadonlyArray<string | number | boolean>;

/**
 *
 */
export interface Query {
  toObject(): Record<string, HttpParamType>;
}

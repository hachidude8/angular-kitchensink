/**
 *  Angular {@link HttpParams} value type placeholder.
 */
export type HttpParamType = string | number | boolean | ReadonlyArray<string | number | boolean>;

/**
 * Rest service query
 */
export interface Query {
  toObject(): Record<string, HttpParamType>;
}

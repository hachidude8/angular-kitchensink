import { HttpParamType } from './query';


/**
 * Data structure to store and handle a HTTP address.
 * This data structure allows the use of path parameters applied to {@var segment}
 * using a semicolon syntax.
 *
 * Parameters examples:
 *  :mode/:segment/:params
 *  clients/:id/orders
 */
export class HttpResource {
  constructor(
    readonly baseUrl: string,
    readonly segment: string
  ) {
  }

  url(params?: Record<string | number, HttpParamType>): string {
    return this.createUrl(this.segment, params);
  }

  protected createUrl(segments: string | string[], params?: Record<string | number, HttpParamType>): string {
    const source = Array.isArray(segments) ? segments : [segments];
    const segment = this.combineSegments(source);
    return this.serializeSegment(segment, params);
  }

  /**
   * Combines the provided segments with the base URL
   */
  protected combineSegments(segments: string[] = []): string {
    const base = `${this.baseUrl}`;
    return segments.reduce((full, segment) => {
      const copy = `${segment?.trim()}`;
      return `${full}/${copy}`;
    }, base);
  }

  protected serializeSegment(
    segment: string,
    params?: Record<string | number, HttpParamType>): string {
    let copy = `${segment}`;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        const compositeKey = `:${key}`;
        copy = copy.replace(compositeKey, `${value}`);
      });
    }
    return copy;
  }
}

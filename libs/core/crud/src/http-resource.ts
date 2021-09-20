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

  url(params?: Record<string | number, string | number>): string {
    const segment = this.serializeSegment(this.segment, params);
    return `${this.baseUrl}/${segment}`;
  }

  protected serializeSegment(
    segment: string,
    params?: Record<string | number, string | number>): string {
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

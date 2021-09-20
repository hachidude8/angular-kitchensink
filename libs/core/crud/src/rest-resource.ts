import { HttpResource } from './http-resource';

/**
 * Extension of {@link HttpResource}.
 * Handles specialized REST paths
 */
export class RestResource extends HttpResource {
  constructor(
    readonly baseUrl: string,
    readonly segment: string,
    readonly restSegments: RestSegments
  ) {
    super(baseUrl, segment);
  }

  getById(params?: Record<string | number, string | number>): string {
    const segment = `${this.segment}/${this.restSegments.getByIdPath}`;
    return this.serializeSegment(segment, params);
  }

  save(params?: Record<string | number, string | number>): string {
    const segment = `${this.segment}/${this.restSegments.savePath}`;
    return this.serializeSegment(segment, params);
  }

  delete(params?: Record<string | number, string | number>): string {
    const segment = `${this.segment}/${this.restSegments.deletePath}`;
    return this.serializeSegment(segment, params);
  }

  static from(
    baseUrl: string,
    baseSegment: string,
    source: Partial<RestSegments>): RestResource {
    const segments: RestSegments = {
      deletePath: source?.deletePath || baseSegment,
      getByIdPath: source?.getByIdPath || baseSegment,
      savePath: source?.savePath || baseSegment
    };
    return new RestResource(baseUrl, baseSegment, segments);
  }
}

export type RestResourceStorage = Map<string, RestResource>;

export interface RestSegments {
  getByIdPath: string;
  savePath: string;
  deletePath: string;
}

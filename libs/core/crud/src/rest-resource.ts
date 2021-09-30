import { HttpResource } from './http-resource';
import { HttpParamType } from './query';


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

  /**
   * Creates a {@link RestResource} instance from a partial source.
   *
   * @param baseUrl Resource base URL
   * @param baseSegment Common base segment shared across all segments
   * @param source Specific actions path. If left undefined or null it will
   *        set an empty string
   */
  static from(
    baseUrl: string,
    baseSegment: string,
    source: Partial<RestSegments>
  ): RestResource {
    const segments: RestSegments = {
      deletePath: source?.deletePath || '',
      getAllPath: source?.getAllPath || '',
      getByIdPath: source?.getByIdPath || '',
      savePath: source?.savePath || '',
      updatePath: source?.updatePath || ''
    };
    return new RestResource(baseUrl, baseSegment, segments);
  }

  getAll(params?: Record<string | number, HttpParamType>): string {
    const source = [this.segment, this.restSegments.getAllPath];
    return this.createUrl(source, params);
  }

  getById(params?: Record<string | number, HttpParamType>): string {
    const source = [this.segment, this.restSegments.getByIdPath];
    return this.createUrl(source, params);
  }

  save(params?: Record<string | number, HttpParamType>): string {
    const source = [this.segment, this.restSegments.savePath];
    return this.createUrl(source, params);
  }

  update(params: Record<string | number, HttpParamType>): string {
    const source = [this.segment, this.restSegments.updatePath];
    return this.createUrl(source, params);
  }

  delete(params?: Record<string | number, HttpParamType>): string {
    const source = [this.segment, this.restSegments.deletePath];
    return this.createUrl(source, params);
  }
}

export type RestResourceStorage = Map<string, RestResource>;

export interface RestSegments {
  getAllPath: string;
  getByIdPath: string;
  savePath: string;
  updatePath: string;
  deletePath: string;
}

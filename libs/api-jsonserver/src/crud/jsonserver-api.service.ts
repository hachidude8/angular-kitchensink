import { HttpEndpoint, HttpOptions, PagedResponse, RestService } from '@aks/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseSerializer } from './response-serializer';
import { Entity, JApiQuery } from './models';
import { isEntity } from './utils';


@Injectable()
export class JsonServerApiService<T = Entity> extends RestService {

  constructor(
    protected http: HttpClient,
    protected endpoint: HttpEndpoint,
    protected serializer: ResponseSerializer
  ) {
    super(http, endpoint);
  }

  protected buildGetByReq(url: string, options: HttpOptions = {}): Observable<unknown> {
    options.observe = 'response';
    return super.buildGetByReq(url, options);
  }

  protected buildGetByUrl(query?: JApiQuery): string {
    let endpoint = this.endpoint.getUrl();
    if (query && query.id) {
      endpoint += `/${ query.id }`;
    }
    return endpoint;
  }

  protected buildDeleteUrl(datum: T): string {
    let endpoint = this.endpoint.getUrl();
    if (isEntity(datum)) {
      endpoint = `${ endpoint }/${ datum.id }`;
    }
    return endpoint;
  }

  protected buildSaveUrl(): string {
    return this.endpoint.getUrl();
  }

  protected serializeGetByResult(response: HttpResponse<T[]>): PagedResponse<T[]> {
    const page = this.serializer.extractPagination(response);
    page.setContents(response.body || []);
    return page as PagedResponse<T[]>;
  }

  // protected serializeRequestConf(props: JApiQuery, conf?: RequestConf): HttpOptions {
  protected serializeRequestConf(query: JApiQuery): HttpOptions {
    if (!query) {
      return {};
    }
    return {
      params: new HttpParams({ fromObject: query.toObject() })
    };
  }
}

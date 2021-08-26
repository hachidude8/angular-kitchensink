import { HttpOptions, RestResource, PagedResponse, CrudService } from '@aks/core/crud';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Entity, JApiQuery } from './models';
import { JsResponseSerializer } from './js-response-serializer';
import { JsRequestSerializer } from './js-request-serializer';
import { isEntity } from './utils';


@Injectable()
export class JsonServerApiService<T = Entity> {

  constructor(
    protected http: HttpClient,
    protected resource: RestResource,
    protected responseSerializer: JsResponseSerializer,
    protected requestSerializer: JsRequestSerializer,
  ) {
    // super(http, resource, responseSerializer, requestSerializer);
  }

  protected buildGetByReq(url: string, options: HttpOptions = {}): Observable<unknown> {
    options.observe = 'response';
    // return super.buildGetByReq(url, options);
    return of(undefined);
  }

  protected buildGetByUrl(query?: JApiQuery): string {
    let endpoint = this.resource.get();
    if (query && query.id) {
      endpoint += `/${ query.id }`;
    }
    return endpoint;
  }

  protected buildDeleteUrl(datum: T): string {
    let endpoint = this.resource.get();
    if (isEntity(datum)) {
      endpoint = `${ endpoint }/${ datum.id }`;
    }
    return endpoint;
  }

  protected buildSaveUrl(): string {
    return this.resource.get();
  }

  protected deserializeGetByResultToPage(response: HttpResponse<T[]>): PagedResponse<T[]> {
    const page = this.responseSerializer.deserializeList(response);
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

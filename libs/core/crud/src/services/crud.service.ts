import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudOperations } from '../crud-operations';
import { HttpOptions, Query, RequestConf } from '../models';
import { Page } from '../page';
import { RestResource } from '../rest-resource';
import { CrudSerializerService } from './crud-serializer.service';


export abstract class CrudService implements CrudOperations {

  protected constructor(
    protected http: HttpClient,
    protected crudSerializer: CrudSerializerService,
    protected httpResource: RestResource,
  ) {
  }

  /**
   * Returns a page of the requested data
   */
  getBy(query?: Query, config?: RequestConf): Observable<Page<unknown>> {
    return this.buildGetByReq(
      this.getByUrl(),
      this.crudSerializer.serializeRequestOptions(query, config)
    ).pipe(map(response => this.crudSerializer.deserializeList(response)));
  }

  protected buildGetByReq(url: string, options?: HttpOptions): Observable<unknown> {
    return this.fetch(url, options);
  }

  protected getByUrl(): string {
    return this.httpResource.url();
  };

  /**
   * Returns one entry of the requested data.
   */
  getOneBy(query?: Query, config?: RequestConf): Observable<unknown> {
    return this.getBy(query, config).pipe(map(page => this.deserializeGetOneByResponse(page)));
  }

  protected deserializeGetOneByResponse(page: Page<unknown>): unknown {
    if (!page.length) {
      throw new Error('There is no available result for the given query');
    }
    return page.getContents()[page.length - 1];
  }

  protected fetch(url: string, options?: HttpOptions): Observable<unknown> {
    return this.http.get(url, options);
  }

  /**
   * Saves the given data.
   */
  save(datum: unknown, config?: RequestConf): Observable<unknown> {
    return this.buildSaveReq(
      this.saveUrl(),
      this.serializeSavePayload(datum),
      this.crudSerializer.serializeRequestOptions(undefined, config)
    );
  }

  protected serializeSavePayload(datum: unknown): unknown {
    return this.crudSerializer.serializePayload(datum);
  }

  protected saveUrl(): string {
    return this.httpResource.save();
  }

  protected buildSaveReq(url: string, datum: unknown, options?: HttpOptions): Observable<unknown> {
    return this.http.post(url, datum, options);
  }

  /**
   * Deletes the given data
   */
  delete(datum: unknown): Observable<unknown> {
    return this.buildDeleteByReq(
      this.deleteUrl(datum)
    );
  }

  protected buildDeleteByReq(url: string, options?: HttpOptions): Observable<unknown> {
    return this.http.delete(url, options);
  }

  protected deleteUrl(datum: unknown): string {
    return this.httpResource.delete(datum);
  }
}

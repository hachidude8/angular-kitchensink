import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CrudService } from './crud.service';
import { HttpEndpoint, HttpOptions, Page, RequestConf, Query } from './models';


export abstract class RestService implements CrudService {

  protected constructor(
    protected http: HttpClient,
    protected endpoint: HttpEndpoint
  ) {
  }

  /**
   * Returns a page with the requested data.
   */
  getBy(query?: Query, conf?: RequestConf): Observable<Page<unknown>> {
    return this.buildGetByReq(
      this.buildGetByUrl(query),
      this.serializeRequestConf(query, conf)
    ).pipe(map(value => this.serializeGetByResult(value)));
  }

  protected buildGetByReq(url: string, options?: HttpOptions): Observable<unknown> {
    return this.fetch(url, options);
  }

  protected abstract buildGetByUrl(query?: Query): string;

  protected abstract serializeGetByResult(value: unknown): Page<unknown>;

  /**
   * Returns one entry of the requested data.
   */
  getOneBy(query?: Query, conf?: RequestConf): Observable<unknown> {
    return this.getBy(query, conf).pipe(
      switchMap(page => this.serializeGetOneByResult(page))
    );
  }

  protected serializeGetOneByResult(page: Page<unknown>): Observable<unknown> {
    const result = page?.length ? page.getContents()[page.length - 1] : undefined;
    return of(result);
  }

  protected fetch(url: string, options?: HttpOptions): Observable<unknown> {
    return this.http.get(url, options);
  }

  save(datum: unknown, conf?: RequestConf): Observable<unknown> {
    return this.buildSaveReq(
      this.buildSaveUrl(datum),
      this.serializePayload(datum),
      this.serializeRequestConf(undefined, conf)
    );
  }

  /**
   * Transforms the payload into the required API format
   */
  protected serializePayload(datum: unknown): unknown {
    return datum;
  }

  protected abstract buildSaveUrl(datum: unknown): string;

  protected buildSaveReq(url: string, datum: unknown, options?: HttpOptions): Observable<unknown> {
    return this.http.post(url, datum, options);
  }

  deleteBy(datum: unknown): Observable<unknown> {
    return this.buildDeleteByReq(
      this.buildDeleteUrl(datum)
    );
  }

  protected buildDeleteByReq(url: string, options?: HttpOptions): Observable<unknown> {
    return this.http.delete(url, options);
  }

  protected abstract buildDeleteUrl(datum: unknown): string;

  protected abstract serializeRequestConf(query?: Query, conf?: RequestConf): HttpOptions;

}

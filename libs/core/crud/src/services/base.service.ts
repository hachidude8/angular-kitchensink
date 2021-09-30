import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudOperations } from '../crud-operations';
import { HttpOptions } from '../models';
import { Page } from '../page';
import { Query } from '../query';
import { RequestConf } from '../request-conf';
import { CrudSerializerService } from './crud-serializer.service';

/**
 * Base CRUD service definition
 */
export abstract class BaseService implements CrudOperations {

  protected constructor(
    protected http: HttpClient,
    protected serializer: CrudSerializerService
  ) {
  }

  /**
   * Returns a page of the requested data
   */
  getBy<T>(query?: Query, config?: RequestConf): Observable<Page<T>> {
    return this.fetch<T>(
      this.getByUrl(query, config),
      this.serializer.serializeRequestOptions(query, config)
    ).pipe(map(response => this.serializer.deserializeList(response) as Page<T>));
  }

  /**
   * Returns one entry of the requested data.
   */
  getOneBy<T>(query?: Query, config?: RequestConf): Observable<T> {
    return this.fetch<T>(
      this.getOneByUrl(query, config),
      this.serializer.serializeRequestOptions(query, config)
    ).pipe(map(response => this.serializer.deserialize(response) as T));
  }

  /**
   * Saves the given data.
   */
  save<T>(datum: Record<string, unknown>, config?: RequestConf): Observable<T> {
    return this.buildSaveReq<T>(
      this.saveUrl(datum, config),
      this.serializer.serializePayload(datum),
      this.serializer.serializeRequestOptions(undefined, config)
    );
  }

  /**
   * Deletes the given data
   */
  delete<T>(datum: Record<string, string | number>, config?: RequestConf): Observable<T> {
    return this.buildDeleteByReq<T>(
      this.deleteUrl(datum),
      this.serializer.serializeRequestOptions(undefined, config)
    );
  }

  protected fetch<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(url, options);
  }

  protected buildSaveReq<T>(
    url: string,
    datum: unknown,
    options?: HttpOptions): Observable<T> {
    return this.http.post<T>(url, datum, options);
  }

  protected buildDeleteByReq<T>(
    url: string,
    options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(url, options);
  }

  protected abstract getByUrl(query?: Query, config?: RequestConf): string;

  protected abstract getOneByUrl(query?: Query, config?: RequestConf): string;

  protected abstract saveUrl(datum: Record<string, unknown>, config?: RequestConf): string;

  protected abstract deleteUrl(datum: Record<string, unknown>, config?: RequestConf): string;
}

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudOperations } from '../crud-operations';
import { HttpOptions, RequestConf } from '../models';
import { Page } from '../page';
import { Query } from '../query';
import { HttpResource } from '../http-resource';
import { RestResource, isRestResource } from '../rest-resource';
import { CrudSerializerService } from './crud-serializer.service';


export abstract class CrudService implements CrudOperations {

  protected constructor(
    protected http: HttpClient,
    protected crudSerializer: CrudSerializerService,
    protected httpResource: HttpResource
  ) {
  }

  /**
   * Returns a page of the requested data
   */
  getBy<T>(query?: Query, config?: RequestConf): Observable<Page<T>> {
    return this.fetch<T>(
      this.getByUrl(query, config),
      this.crudSerializer.serializeRequestOptions(query, config)
    ).pipe(map(response => this.crudSerializer.deserializeList(response) as Page<T>));
  }

  /**
   * Returns one entry of the requested data.
   */
  getOneBy<T>(query?: Query, config?: RequestConf): Observable<T> {
    return this.fetch<T>(
      this.getOneByUrl(query, config),
      this.crudSerializer.serializeRequestOptions(query, config)
    ).pipe(map(response => this.crudSerializer.deserialize(response) as T));
  }

  /**
   * Saves the given data.
   */
  save<T>(datum: Record<string, unknown>, config?: RequestConf): Observable<T> {
    return this.buildSaveReq<T>(
      this.saveUrl(datum, config),
      this.crudSerializer.serializePayload(datum),
      this.crudSerializer.serializeRequestOptions(undefined, config)
    );
  }

  /**
   * Deletes the given data
   */
  delete<T>(datum: Record<string, string | number>, config?: RequestConf): Observable<T> {
    return this.buildDeleteByReq<T>(
      this.deleteUrl(datum),
      this.crudSerializer.serializeRequestOptions(undefined, config)
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

  protected getByUrl(query?: Query, config?: RequestConf): string {
    return isRestResource(this.httpResource)
      ? this.httpResource.getAll(query?.toObject())
      : this.httpResource.url(query?.toObject());
  };

  protected getOneByUrl(query?: Query, config?: RequestConf): string {
    return isRestResource(this.httpResource)
      ? this.httpResource.getById(query?.toObject())
      : this.httpResource.url(query?.toObject());
  }

  protected saveUrl(datum: Record<string, unknown>, config?: RequestConf): string {
    return isRestResource(this.httpResource)
      ? this.httpResource.save(datum as never)
      : this.httpResource.url(datum as never);
  }

  protected deleteUrl(datum: Record<string, unknown>, config?: RequestConf): string {
    return isRestResource(this.httpResource)
      ? this.httpResource.delete(datum as never)
      : this.httpResource.url(datum as never);
  }
}

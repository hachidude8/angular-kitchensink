import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CrudService } from './crud.service';
import { HttpEndpoint } from './models';


export abstract class HttpCrudService implements CrudService {

  protected constructor(
    protected http: HttpClient,
    protected endpoint: HttpEndpoint
  ) {
  }

  getBy(props?: Record<string, unknown>): Observable<Record<string, unknown>[]> {
    const url = this.buildGetByUrl(props);
    const options = this.propsToOptions(props);
    return this.buildGetByReq(url, options);
  }

  protected buildGetByReq(url: string, reqOptions?: Record<string, unknown>): Observable<Record<string, unknown>[]> {
    return this.buildGetRequest(url, reqOptions);
  }

  protected abstract buildGetByUrl(props?: Record<string, unknown>): string;

  getOneBy(props: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.getBy(props).pipe(switchMap(results => this.getOneByReducer(results)));
  }

  protected getOneByReducer(results: Record<string, unknown>[]): Observable<Record<string, unknown>> {
    const result = results?.length ? results[results.length - 1] : undefined;
    return of(result);
  }

  protected buildGetRequest(url: string, requestOptions?: Record<string, unknown>): Observable<Record<string, unknown>[]> {
    return this.http.get<Record<string, unknown>[]>(url, requestOptions);
  }

  save(datum: Record<string, unknown>): Observable<Record<string, unknown>> {
    const url = this.buildSaveUrl(datum);
    return this.buildSaveReq(url, datum);
  }

  protected abstract buildSaveUrl(datum?: Record<string, unknown>): string;

  protected buildSaveReq(url: string, datum: unknown, options?: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(url, datum, options);
  }

  deleteBy(datum: Record<string, unknown>): Observable<unknown> {
    const url = this.buildDeleteUrl(datum);
    return this.buildDeleteByReq(url);
  }

  protected buildDeleteByReq(url: string, options?: Record<string, unknown>): Observable<unknown> {
    return this.http.delete(url, options);
  }

  protected abstract propsToOptions(props: Record<string, unknown>): Record<string, unknown>;

  protected abstract buildDeleteUrl(datum: Record<string, unknown>): string;

}

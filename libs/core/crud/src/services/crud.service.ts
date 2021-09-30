import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpResource } from '../http-resource';
import { Page } from '../page';
import { PageImpl } from '../page-impl';
import { Query } from '../query';
import { RequestConf } from '../request-conf';
import { isRestResource, RestResource } from '../rest-resource';
import { BaseService } from './base.service';
import { CrudSerializerService } from './crud-serializer.service';


export abstract class CrudService extends BaseService {

  private readonly source$ = new BehaviorSubject(PageImpl.empty());

  protected constructor(
    protected http: HttpClient,
    protected serializer: CrudSerializerService,
    protected resource: HttpResource | RestResource
  ) {
    super(http, serializer);
  }

  connect<T>() {
    return (this.source$.asObservable() as unknown) as Page<T>;
  }

  getBy<T>(query?: Query, config?: RequestConf): Observable<Page<T>> {
    return super.getBy<T>(query, config).pipe(
      tap(result => this.updateSource(result))
    );
  }

  protected getByUrl(query?: Query, config?: RequestConf): string {
    return isRestResource(this.resource)
      ? this.resource.getAll(query?.toObject())
      : this.resource.url(query?.toObject());
  };

  protected getOneByUrl(query?: Query, config?: RequestConf): string {
    return isRestResource(this.resource)
      ? this.resource.getById(query?.toObject())
      : this.resource.url(query?.toObject());
  }

  protected saveUrl(datum: Record<string, unknown>, config?: RequestConf): string {
    return isRestResource(this.resource)
      ? this.resource.save(datum as never)
      : this.resource.url(datum as never);
  }

  protected deleteUrl(datum: Record<string, unknown>, config?: RequestConf): string {
    return isRestResource(this.resource)
      ? this.resource.delete(datum as never)
      : this.resource.url(datum as never);
  }

  protected updateSource<T>(value: Page<T>) {
    this.source$.next(value);
  }
}

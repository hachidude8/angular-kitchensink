import { isRecord } from '@aks/utils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResource } from '../http-resource';
import { Query } from '../query';
import { GenericRequestConf } from '../request-conf';
import { isRestResource, RestResource } from '../rest-resource';
import { BaseService } from './base.service';
import { CrudSerializerService } from './crud-serializer.service';
import { RestResourcesService } from './rest-resources.service';


@Injectable({ providedIn: 'root' })
export class GenericCrudService extends BaseService {
  constructor(
    protected http: HttpClient,
    protected serializer: CrudSerializerService,
    private resources: RestResourcesService
  ) {
    super(http, serializer);
  }

  protected deleteUrl(datum: Record<string, unknown>, config?: GenericRequestConf): string {
    const resource = this.getResource(config || { resource: '' });
    return isRestResource(resource)
      ? resource.delete(datum as never)
      : resource.url(datum as never);
  }

  protected getByUrl(query?: Query, config?: GenericRequestConf): string {
    const resource = this.getResource(config || { resource: '' });
    return isRestResource(resource)
      ? resource.getAll(query?.toObject())
      : resource.url(query?.toObject());
  }

  protected getOneByUrl(query?: Query, config?: GenericRequestConf): string {
    const resource = this.getResource(config || { resource: '' });
    return isRestResource(resource)
      ? resource.getById(query?.toObject())
      : resource.url(query?.toObject());
  }

  protected saveUrl(datum: Record<string, unknown>, config?: GenericRequestConf): string {
    const resource = this.getResource(config || { resource: '' });
    return isRestResource(resource)
      ? resource.save(datum as never)
      : resource.url(datum as never);
  }

  private getResource(config: GenericRequestConf): RestResource | HttpResource {
    if (!isRecord(config) || !config.resource) {
      throw new Error(`Must provide a valid Request Resource object.`);
    }
    const { resource } = config;
    return typeof resource === 'string'
      ? this.resources.get(resource)
      : resource;
  }

}

import { CrudSerializerService, CrudService, RestResourcesService, } from '@aks/core/crud';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class UserService extends CrudService {
  constructor(protected http: HttpClient,
              protected crudSerializer: CrudSerializerService,
              protected httpResources: RestResourcesService) {
    super(http, crudSerializer, httpResources.get('users'));
  }
}

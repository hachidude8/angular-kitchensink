import { HttpEndpoint } from '@aks/core';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HTTP_SERIALIZER, ResponseSerializer, JsonServerApiService } from '../../crud';
import { User } from './models';


@Injectable({ providedIn: 'root' })
export class UserService extends JsonServerApiService<User> {
  constructor(protected http: HttpClient,
              @Inject(HTTP_SERIALIZER) protected serializer: ResponseSerializer) {
    super(http, new HttpEndpoint('http://localhost:3000/users'), serializer);
  }
}

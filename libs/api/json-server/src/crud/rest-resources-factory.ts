import { RestResource, restResourceFactory, RestResourceStorage } from '@aks/core/crud';


export function restResourcesFactory(): RestResourceStorage {
  const baseUrl = 'http://localhost:3000';
  const resources = restResourceFactory({
    users: new RestResource<number>(baseUrl, 'users'),
    companies: new RestResource<number>(baseUrl, 'companies'),
  });
  console.debug(`Created a new http resources definition`, resources);
  return resources;
}

import { RestResource, restResourceFactory, RestResourceStorage } from '@aks/core/crud';


export function restResourcesFactory(): RestResourceStorage {
  const baseUrl = 'http://localhost:3000';
  const resources = restResourceFactory({
    users: RestResource.from(baseUrl, 'users', {}),
    companies: RestResource.from(baseUrl, 'companies', {}),
  });
  console.debug(`Created a new http resources definition`, resources);
  return resources;
}

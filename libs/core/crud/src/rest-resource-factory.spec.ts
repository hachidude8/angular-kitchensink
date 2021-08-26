import { RestResource } from './rest-resource';
import { restResourceFactory } from './rest-resource-factory';


describe('restResourceFactory', () => {
  it('Should create a type of RestResourceStorage from a given record', () => {
    const test = new RestResource('test.com', 'test');
    const resources = restResourceFactory({ test });
    expect(resources instanceof Map).toBeTruthy();
    expect(resources.get('test')).toStrictEqual(test);
  });

  it('Should throw an error there is no source provided', () => {
    const fn = () => restResourceFactory(undefined);
    expect(fn).toThrowError();
  });
});

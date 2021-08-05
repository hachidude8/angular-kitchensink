import NamedRoutes from './named-routes';


describe('NamedRoutes', () => {
  it('Should create an instance', () => {
    const routes = new NamedRoutes();
    expect(routes).toBeTruthy();
  });

  it('Should have called "from" static factory method', () => {
    const spy = spyOn(NamedRoutes, 'from');
    spy([]);
    expect(spy).toHaveBeenCalled();
  });

  it('Should register a route', () => {
    const routes = new NamedRoutes();
    routes.register({ key: 'test', value: '/test' });
    expect(routes.getRoute('test')).toBeTruthy();
  });

  it('Should register a route', () => {
    const routes = new NamedRoutes();
    routes.register({ key: 'test', value: '/test' });
    expect(routes.getRoute('test')).toBeTruthy();
  });

  it('Should register a route with a root forward slash "/"', () => {
    const routes = new NamedRoutes();
    routes.register({ key: 'test', value: '/test/slash' });
    const result = routes.getRoute('test');
    const expected = ['/', 'test', 'slash'];
    // If forward slash is not parsed correctly, result would be ['/', '', 'test', 'slash']
    expect(result).toStrictEqual(expected);
  });

  it('Should register a route without a root forward slash "/"', () => {
    const routes = new NamedRoutes();
    routes.register({ key: 'test', value: 'test/slash' });
    const result = routes.getRoute('test');
    const expected = ['/', 'test', 'slash'];
    expect(result).toStrictEqual(expected);
  });

  it('Should throw an error if a route does not exist', () => {
    const routes = new NamedRoutes();
    const nested = () => routes.getRoute('unknown');
    const expected = new Error('"unknown" is not registered as a key');
    expect(nested).toThrowError(expected);
  });

  it('"from" should create an instance with predefined routes', () => {
    const routes = NamedRoutes.from([{ key: 'test', value: '/hello' }]);
    expect(routes.getRoute('test')).toBeTruthy();
  });

  it('"from" should not create an instance if no routes are provided', () => {
    const expected = new Error('Undefined routes error')
    expect(NamedRoutes.from).toThrowError(expected);
  });

});

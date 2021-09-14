import { NamedRoutePipe } from './named-route.pipe';
import { NamedRoutes } from './named-routes';


const routes: NamedRoutes = NamedRoutes.from([
  { key: 'home', value: '/home' },
  { key: 'home-params', value: '/home/:param' }
]);

describe('NamedRoutePipe', () => {
  it('Should create an instance', () => {
    const pipe = new NamedRoutePipe(routes);
    expect(pipe).toBeTruthy();
  });

  it('Should return segments', () => {
    const pipe = new NamedRoutePipe(routes);
    const expected = ['/', 'home'];
    expect(pipe.transform('home')).toStrictEqual(expected);
  });

  it('Should return segments with parsed params', () => {
    const pipe = new NamedRoutePipe(routes);
    const expected = ['/', 'home', '42'];
    expect(pipe.transform('home-params', { param: 42 })).toStrictEqual(expected);
  });

  it('Should return a list of empty segments', () => {
    const pipe = new NamedRoutePipe(routes);
    const expected = [];
    expect(pipe.transform('')).toStrictEqual(expected);
  });

});

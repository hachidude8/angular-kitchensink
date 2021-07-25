import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Params } from '@angular/router';
import NamedRoutes from './named-routes';
import { ROUTES } from './tokens';


@Pipe({ name: 'namedRoute' })
export class NamedRoutePipe implements PipeTransform {

  private readonly instance: string;
  private prevKey: string | undefined;
  private prevResult: string[] = [];

  constructor(@Inject(ROUTES) private routes: NamedRoutes) {
    this.instance = 'namedRoutePipe' + Math.floor(Math.random() * 10_000);
  }

  /**
   * Returns the requested route.
   * If the route is not defined it will return an empty array.
   */
  transform(key: string, params?: Params): string[] {
    if (key === this.prevKey) {
      console.info(`Reusing prev result for ${ key }`);
      return this.prevResult;
    }

    this.prevKey = key;
    let result: string[] = []
    try {
      result = this.routes.getRoute(key, params);
      this.prevResult = result;
    } catch (e) {
      result = [];
    }
    return result;
  }

}

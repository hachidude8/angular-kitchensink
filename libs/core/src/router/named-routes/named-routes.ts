import { Params } from '@angular/router';
import { NamedRoute } from './named-route';


export default class NamedRoutes {
  private readonly routes = new Map<string, string>();

  /**
   * Creates a new {@link NamedRoutes} instance with the provided routes.
   * @return NamedRoutes instance
   * @throws Undefined routes error
   */
  public static from(routes: NamedRoute[]): NamedRoutes {
    if (!routes?.length) {
      throw new Error('Undefined routes error');
    }
    const namedRoutes = new NamedRoutes();
    routes.forEach((route) => namedRoutes.register(route));
    return namedRoutes;
  }

  /**
   * Returns the route from the storage
   * @return Route value
   * @throws Key not found
   */
  getRoute(key: string, params?: Params): string[] {
    // Get the route from storage
    if (!this.routes.has(key)) {
      throw new Error(`"${ key }" is not registered as a key`);
    }
    let baseRoute = this.routes.get(key) + '';
    if (params) {
      Object.keys(params).forEach(key => baseRoute = baseRoute.replace(`:${ key }`, params[key]));
    }
    const val = baseRoute.split('/');
    val.unshift('/');
    return val;
  }

  /**
   * Registers a new key in memory
   * @throws Invalid key-value pair
   */
  register({ key, value }: NamedRoute): void {
    const parsedKey = key?.trim();
    let parsedValue = value?.trim();
    if (!parsedKey || !parsedValue) {
      throw new Error(`Must provide a valid key-value pair. Provided data was: "key: ${ key }", "value: ${ value }"`);
    }
    if (parsedValue.startsWith('/')) {
      parsedValue = parsedValue.slice(1, parsedValue.length);
    }
    this.routes.set(parsedKey, parsedValue);
  }
}

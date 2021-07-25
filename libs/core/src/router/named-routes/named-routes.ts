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
    if (this.routes.has(key)) {
      let baseRoute = this.routes.get(key) + '';
      if (!baseRoute) {
        throw new Error(`"${ key }" does not contain a registered value`);
      }
      if (params) {
        Object.keys(params).forEach(key => baseRoute = baseRoute.replace(`:${ key }`, params[key]));
      }
      const val = baseRoute.split('/');
      val.unshift('/');
      console.info(`Getting route ${ key }`, val);
      return val;
    }
    throw new Error(`"${ key }" is not registered as a key`);
  }

  /**
   * Registers a new key in memory
   * @throws Invalid key-value pair
   */
  register({ key, value }: NamedRoute): void {
    if (!key || !value) {
      throw new Error(`Must provide a valid key-value pair. Provided data was: "key: ${ key }", "value: ${ value }"`);
    }
    let parsedValue = value.trim();
    if (parsedValue.startsWith('/')) {
      parsedValue = parsedValue.slice(1, parsedValue.length);
    }
    this.routes.set(key.trim(), parsedValue);
  }
}

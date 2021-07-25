import { InjectionToken } from '@angular/core';
import NamedRoutes from './named-routes';


export const ROUTES = new InjectionToken<NamedRoutes>(
  'Application level defined routes'
);

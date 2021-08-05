import { ModuleWithProviders, NgModule } from '@angular/core';
import { NamedRoutePipe } from './named-route.pipe';
import NamedRoutes from './named-routes';
import { ROUTES } from './tokens';
import { NamedRoute } from './named-route';


@NgModule({
  imports: [],
  declarations: [
    NamedRoutePipe
  ],
  exports: [
    NamedRoutePipe
  ]
})
export class NamedRoutesModule {
  static forRoot(routes: NamedRoute[]): ModuleWithProviders<NamedRoutesModule> {
    return {
      ngModule: NamedRoutesModule,
      providers: [
        { provide: ROUTES, useValue: NamedRoutes.from(routes) }
      ]
    }
  }
}

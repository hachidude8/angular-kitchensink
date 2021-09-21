import { NamedRouteSource, NamedRoutesModule } from '@aks/router/named-routes';
import { NgModule } from '@angular/core';


const routes: NamedRouteSource[] = [
  { key: 'home', value: 'home' },
  { key: 'userList', value: 'users' },
  { key: 'userDetails', value: 'users/:id' },
];


@NgModule({
  imports: [NamedRoutesModule.forRoot(routes)],
  exports: [NamedRoutesModule]
})
export class NamedRoutesConfig {
}

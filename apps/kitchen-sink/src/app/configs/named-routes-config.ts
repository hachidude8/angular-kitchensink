import { NamedRoutesModule, NamedRoute } from '@aks/core';
import { NgModule } from '@angular/core';


const APP_ROUTES: NamedRoute[] = [
  { key: 'home', value: 'home' },
  { key: 'userList', value: 'users' },
  { key: 'userDetails', value: 'users/:id' },
];


@NgModule({
  imports: [NamedRoutesModule.forRoot(APP_ROUTES)],
  exports: [NamedRoutesModule]
})
export class NamedRoutesConfig {
}

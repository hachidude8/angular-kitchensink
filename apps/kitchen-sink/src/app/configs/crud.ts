import { JsonServerCrudModule } from '@aks/api/json-server';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [JsonServerCrudModule],
  exports: [JsonServerCrudModule]
})
export class CrudConfiguration {
}

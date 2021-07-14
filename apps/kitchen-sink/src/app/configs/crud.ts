import { JsonServerCrudModule } from '@aks/api-jsonserver';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [JsonServerCrudModule],
  exports: [JsonServerCrudModule]
})
export class CrudConfiguration {
}

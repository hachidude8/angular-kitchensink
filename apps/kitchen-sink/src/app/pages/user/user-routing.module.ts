import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsPage, UserListPage } from './components';


const routes: Routes = [
  { path: '', component: UserListPage },
  { path: ':id', component: UserDetailsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

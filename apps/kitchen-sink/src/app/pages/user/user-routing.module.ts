import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsPageComponent, UserListPageComponent } from './pages';


const routes: Routes = [
  { path: '', component: UserListPageComponent },
  { path: ':id', component: UserDetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

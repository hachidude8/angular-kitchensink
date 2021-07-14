import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import('./pages/home').then(m => m.HomeModule) },
  { path: 'users', loadChildren: () => import('./pages/user').then(m => m.UserModule) },
  { path: '**', loadChildren: () => import('./pages/not-found').then(m => m.NotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

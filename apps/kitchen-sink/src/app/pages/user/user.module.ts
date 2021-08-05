import { NamedRoutesModule } from '@aks/core';
import { MatConfirmationModule } from '@aks/mat-confirmation';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadersModule } from '../../gui/loaders/loaders.module';
import { UserEditorComponent, UserFilterComponent, UserListComponent } from './components';
import { UserDetailsPageComponent, UserListPageComponent } from './pages';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    UserDetailsPageComponent,
    UserListPageComponent,
    UserEditorComponent,
    UserListComponent,
    UserFilterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    LoadersModule,
    NamedRoutesModule,
    MatConfirmationModule
  ]
})
export class UserModule {
}
